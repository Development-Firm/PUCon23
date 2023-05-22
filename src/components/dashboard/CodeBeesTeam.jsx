import { Modal, Table, Tooltip, Collapse, Descriptions, Image, message, Button, Input } from 'antd'
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
  deleteDoc
} from 'firebase/firestore'
import { genHoverStyle } from 'antd/es/input/style'
import { deleteObject, ref } from 'firebase/storage'
import {CSVLink} from "react-csv"
const { Search }=Input

const InfoModel = ({ modalContent, handleOk, handleCancel, isModalOpen }) => {
  const { Panel } = Collapse
  return (
    <Modal
      title={modalContent.team_name }
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

  const onSearch=e => {
    setSearchedText( e.target.value.toLowerCase() )
  }

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

  useEffect( () => {
    if ( searchedText ) {
      setFilteredApplicants( applicants.filter( el => el.teamName.toLowerCase().includes( searchedText ) ) )
    }
    else {
      setFilteredApplicants( [] )
    }

  }, [ searchedText ] )

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('status', '==', 'approved'),
      where('competition', '==', 'code bees'),
      orderBy('createdAt')
    )
    const unsuscribe = onSnapshot(queryMessages, snapshot => {
      let applicants = []
      let i=1;
        snapshot.forEach(doc => {
          let campus=doc.data().member_1_email[ 2 ]==='d'||doc.data().member_1_email[ 7 ]==='5'? 'NC':'OC';
          applicants.push( {
            count: i,
            teamName: doc.data().team_name,
            campus,
            noOfMembers: doc.data().team_members_count,
            teamLead: doc.data().member_1_name,
            email: doc.data().member_1_email,
            competition: doc.data().competition,
            teamData: { ...doc.data() },
            key: doc.id
          })
          i++;
        } )
        

      setApplicants(applicants)
    })

    return () => unsuscribe()
  }, [])

  const columns = [
    {
      title: 'Team name',
      dataIndex: 'teamName',
      key: 'teamName'
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
      key: 'teamLead'
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
              filename={"Code_Bees_Teams.csv"}
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
        {<Table columns={columns} onChange={handleChange} dataSource={searchedText? filteredApplicants:applicants} size='middle' title={currData => {
          return <p className='font-bold'>Results: {filteredCount==0||filteredCount? filteredCount:searchedText? currData.length:applicants?.length}</p>
        }
        } />}
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

const CodeBeesTeam = () => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
    {contextHolder}
    <div className='px-[100px]'>
      <Header heading='Code Bees Teams' add_btn={false} />
      <div style={{ marginTop: '2rem' }}>
        <ApplicantTable messageApi={messageApi}/>
      </div>
    </div>
    </>
  )
}

export default CodeBeesTeam
