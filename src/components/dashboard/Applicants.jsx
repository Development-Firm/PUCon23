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
  const clearFilters=() => {
    setFilteredInfo( {} );
    setFilteredCount( null )

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
        applicants.push( {
          count: i,
          campus,
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
      setFilteredApplicants( applicants.filter( el => el.teamName.toLowerCase().includes( searchedText ) ) )
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
      title: 'Campus',
      dataIndex: 'campus',
      key: 'campus',
      width: '10%',

      filters: [
        {
          text: 'Old Campus',
          value: 'OC',
        },
        {
          text: 'New Campus',
          value: 'NC',
        },

      ],
      filteredValue: filteredInfo.campus||null,
      onFilter: ( value, record ) => {
        return record.campus.includes( value );
      },
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filters: [
        {
          text: 'F19',
          value: 'f19',
        },
        {
          text: 'F20',
          value: 'f20',
        },
        {
          text: 'F21',
          value: 'f21',
        },
        {
          text: 'F22',
          value: 'f22',
        },

      ],
      filteredValue: filteredInfo.email||null,
      onFilter: ( value, record ) => {
        return record.email.includes( value );
      },
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
          placeholder='Start searching by Team name'
          style={{ marginBottom: '0.3rem', width: '35rem' }}
          enterButton
          onChange={onSearch}
        />
        <Button className='clear_btn' onClick={clearFilters}>Clear all filters</Button>
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
