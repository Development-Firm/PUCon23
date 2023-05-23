import { Modal, Table, Tooltip, Collapse, Descriptions, Image, message, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import Header from '../generic/Header'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  EditOutlined,
  SendOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { db, storage } from '../../firebase'
import {
  collection,
  updateDoc,
  doc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  getDoc
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { genHoverStyle } from 'antd/es/input/style'
import sendApprovalEmail from '../../utils/approvalEmail'
import {CSVLink} from "react-csv"
const { Search }=Input


const InfoModel = ({ modalContent, handleOk, handleCancel, isModalOpen }) => {
  const { Panel } = Collapse
  console.log( modalContent, new Date( modalContent.createdAt.seconds ) )
  return (
    <Modal
      title={modalContent.team_name}
      footer={null}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      style={{top:'2vh'}}
    >
      <Collapse>
        {Array.from(
          { length: modalContent.team_members_count },
          (_, i) => i + 1
        ).map((el, i) => {
          return (
            <Panel header={modalContent[`member_${el}_name`]} key={i}>
              <Descriptions layout='vertical' bordered>
                <Descriptions.Item
                  labelStyle={{ fontWeight: 'bold' }}
                  style={{ textAlign: 'center' }}
                  label='Email'
                >
                  {modalContent[`member_${el}_email`]}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{ fontWeight: 'bold' }}
                  style={{ textAlign: 'center' }}
                  label='CNIC'
                >
                  {modalContent[`member_${el}_cnic`]}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{ fontWeight: 'bold' }}
                  style={{ textAlign: 'center' }}
                  label='Phone'
                >
                  {modalContent[`member_${el}_phone`]}
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )
        })}
      </Collapse>
      <Descriptions title="Other details" style={{ marginTop: '1.5rem' }} size={'default'} extra={<Button type="primary">Edit</Button>}>
        <Descriptions.Item label="Institute">{modalContent.institute}</Descriptions.Item>
        <Descriptions.Item label="Team Lead">{modalContent.member_1_name}</Descriptions.Item>
        <Descriptions.Item label="Accomodation">{Number( modalContent.accomodation_count )? `${Number( modalContent.accomodation_count )} persons`:'No accomodation'}</Descriptions.Item>
        <Descriptions.Item label="Promo Code">{modalContent.promo_code}</Descriptions.Item>
        <Descriptions.Item label="Amount Paid">{modalContent.total} PKR</Descriptions.Item>
        <Descriptions.Item label="Status"><span className='text-[red]'>{modalContent.status}</span></Descriptions.Item>
        <Descriptions.Item label="Competition">{modalContent.competition}</Descriptions.Item>
        {/* <Descriptions.Item label="Applied on">{new Date( modalContent.createdAt.nanoseconds ).getDate()}</Descriptions.Item> */}
      </Descriptions>
      <h4 className='font-[600] text-[16px]'>Receipt</h4>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem',marginBottom:'2rem' }}>
        <Image width={200} src={modalContent.imageUrl} />
      </div>
    </Modal>
  )
}

const ApplicantTable = ({messageApi}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const messagesRef = collection(db, 'registrations')
  const [applicants, setApplicants] = useState(null)
  const [modelData, setModelData] = useState(null)
  const { confirm } = Modal;

  const [ searchedText, setSearchedText ]=useState( '' )
  const [ filteredApplicants, setFilteredApplicants ]=useState( [] )
  const [ filteredInfo, setFilteredInfo ]=useState( {} );
  const [ filteredCount, setFilteredCount ]=useState( null );

  const handleChange=( pagination, filters, sorter, data ) => {
    setFilteredInfo( filters );
    setFilteredCount( data.currentDataSource.length )
  };
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setModelData(null)
    setIsModalOpen(false)
  }

  const onSearch=e => {
    setSearchedText( e.target.value.toLowerCase() )
  }

  const approveAndSendMail = async (ID) => {
    try {
      messageApi.open( {
        type: 'loading',
        content: 'We are processing your request, Please wait...',
        duration: 0
      } );
      const docRef = doc(db, 'registrations', ID);
      const docc = await getDoc(docRef);
      let { member_1_email, member_1_name, competition, team_name }=docc.data()
      await updateDoc(docRef, { status: 'approved' });
      competition= competition.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      team_name=team_name.split( ' ' ).map( word => word.charAt( 0 ).toUpperCase()+word.slice( 1 ) ).join( ' ' );
      const firstName = member_1_name.split(' ')[0].charAt(0).toUpperCase() + member_1_name.split(' ')[0].slice(1);
      messageApi.destroy()
      sendApprovalEmail( member_1_email, firstName, competition, team_name );
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong, try again!',
        duration: 3,
      });
    }
  }
  const cancelRegistration = async (ID,imageUrl) => {
    try {
      messageApi.open( {
        type: 'loading',
        content: 'We are processing your request, Please wait...',
        duration: 0
      } );
      // Get the image URL from the Firestore document
      const docRef = await doc(db, 'registrations', ID)
      // Delete the document from Firestore
      await deleteDoc(docRef)
      // If the image URL exists, delete the image from storage
      if (imageUrl) {
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      }
      messageApi.destroy()
      messageApi.open({
        type: 'success',
        content: 'Registration has been cancelled!',
        duration: 3,
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong, try again!',
        duration: 3,
      });
    }
  }
  

  function handleRegistrationApprove(ID) {
    confirm({
      title: 'Are you sure you want to approve and send the email?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        approveAndSendMail(ID);
      },
      okButtonProps: {
        style: {
          color: 'black',
          borderColor:'black',
        },
        className: 'ok-button'
      },
      cancelButtonProps: {
        style: {
          color: 'white',
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth:'2px'
        },
        className: 'cancel-button',
      }
    });
  }

  function handleRegistrationCancel(ID,imageUrl) {
    confirm({
      title: 'Are you sure you want to cancel this registration request?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        cancelRegistration(ID,imageUrl);
      },
      cancelButtonProps: {
        style: {
          color: 'black',
          borderColor:'black',
        },
        className: 'cancel-reg-cancel-button'
      },
      okButtonProps: {
        style: {
          color: 'white',
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth:'2px'
        },
        className: 'cancel-button',
      }
    });
  }
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('status', '==', 'pending'),
      orderBy('createdAt')
    )
    const unsuscribe = onSnapshot(queryMessages, snapshot => {
      let applicants = []
      let i=1;
      snapshot.forEach( ( doc ) => {
        let campus=doc.data().member_1_email[ 2 ]==='d'|| doc.data().member_1_email[ 2 ]==='D'||doc.data().member_1_email[ 7 ]==='5'? 'NC':'OC';
        console.log( '------->', doc.data() )
        applicants.push( {
          count: i,
          institute: doc.data().institute,
          teamName: doc.data().team_name,
          noOfMembers: doc.data().team_members_count,
          teamLead: doc.data().member_1_name,
          email: doc.data().member_1_email,
          competition: doc.data().competition,
          teamData: { ...doc.data() },
          key: doc.id
        } )
        i++;

      })
      setApplicants(applicants)
    })

    return () => unsuscribe()
  }, [] )

  useEffect( () => {
    if ( searchedText ) {
      setFilteredApplicants( applicants.filter( el => el.teamName.toLowerCase().includes( searchedText )||el.institute.toLowerCase().includes( searchedText ) ) )
    }
    else {
      setFilteredApplicants( [] )
    }

  }, [ searchedText ] )

  const columns = [

    {
      title: 'Team name',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'No. of members',
      dataIndex: 'noOfMembers',
      key: 'noOfMembers',
      width: '10%'

    },
    {
      title: 'Team Lead',
      dataIndex: 'teamLead',
      key: 'teamLead',
    },
    {
      title: 'Institue',
      dataIndex: 'institute',
      key: 'institute',
      width: '10%',

      // filters: [
      //   {
      //     text: 'FAST',
      //     value: 'fast, nuces,national university of computer and emerging sciences ',
      //   },
      //   {
      //     text: 'PUCIT',
      //     value: 'punjab university college of information technology, pucit, fcit, university of the punjab ',
      //   },
      //   {
      //     text: 'NUST',
      //     value: 'nust, national university of sciences and technology, national university of sciences & technology',
      //   },
      //   {
      //     text: 'ITU',
      //     value: 'itu, information technology university',
      //   },
      //   {
      //     text: 'COMSATS',
      //     value: 'comsats',
      //   },
      //   {
      //     text: 'Riphah International University',
      //     value: 'riphah international university',
      //   },
      //   {
      //     text: 'Bahria University',
      //     value: 'bahria university',
      //   },

      // ],
      // filteredValue: filteredInfo.campus||null,
      // onFilter: ( value, record ) => {
      //   console.log( record.institute.toLowerCase(), value, value.includes( record.institute.toLowerCase() ) )
      //   return record.institute.toLowerCase().includes( value );
      // },
      // ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Competition Type',
      dataIndex: 'competition',
      key: 'competition',
      filters: [
        {
          text: 'Code Bees',
          value: 'code',
        },
        {
          text: 'Web Hackathon',
          value: 'web',
        },
        {
          text: 'Mobile Hackathon',
          value: 'mobile',
        },
      ],
      filteredValue: filteredInfo.competition||null,
      onFilter: ( value, record ) => {
        return record.competition.includes( value );
      },
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <>
          <Tooltip title='View Team info'>
            <span
              onClick={() => {
                setModelData(record.teamData)
                showModal(true)
              }}
              style={{
                fontSize: '1.3rem',
                color: '#45bf55',
                cursor: 'pointer'
              }}
            >
              <EyeOutlined />
            </span>
          </Tooltip>
          <Tooltip title='Approve and send email'>
            <span
              onClick={() => {
                handleRegistrationApprove(record.key)
              }}
              style={{
                fontSize: '1.3rem',
                color: '#050816',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              <SendOutlined />
            </span>
          </Tooltip>
          <Tooltip title='Cancel registartion application'>
            <span
              onClick={() => {
                handleRegistrationCancel(record.key,record.teamData.imageUrl)
              }}
              style={{
                fontSize: '1.3rem',
                color: '#050816',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              <CloseOutlined />
            </span>
          </Tooltip>
        </>
      )
    }
  ]

  return (
    <>
      <div className=''>
        <Search
          size='large'
          placeholder='Search by team name or institute'
          style={{ marginBottom: '0.3rem', width: '35rem' }}
          enterButton
          onChange={onSearch}
        />
       { applicants &&<Button className='clear_btn'>
        <CSVLink
              filename={"Applicants.csv"}
              data={applicants.map((el)=> {
                let retData= {...el.teamData}
                delete retData.createdAt;
                delete retData.status;
                return retData
              })}
              className="btn btn-primary"
            >
              Export to CSV
            </CSVLink>
        </Button>}
        <Table columns={columns} dataSource={searchedText? filteredApplicants:applicants} size='middle' onChange={handleChange} title={currData => {
          return <p className='font-bold'>Results: {filteredCount==0||filteredCount? filteredCount:searchedText? currData.length:applicants?.length}</p>
        }
        } />
        {modelData && (
          <InfoModel
            modalContent={modelData}
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
        )}
      </div>
    </>
  )
}


const Applicants = () => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
    {contextHolder}
    <div className='px-[100px]'>
      <Header heading='Applicants' add_btn={false} />
      <div style={{ marginTop: '2rem' }}>
        <ApplicantTable messageApi={messageApi}/>
      </div>
    </div>
    </>
  )
}

export default Applicants
