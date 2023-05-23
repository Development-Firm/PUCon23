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
  deleteDoc
} from 'firebase/firestore'
import { genHoverStyle } from 'antd/es/input/style'
import { deleteObject, ref } from 'firebase/storage'
import { CSVLink } from "react-csv"
const { Search }=Input


const InfoModel=( { modalContent, handleOk, handleCancel, isModalOpen } ) => {
  const { Panel }=Collapse
  console.log( '---->', modalContent )
  return (
    <Modal
      title={modalContent.team_name}
      footer={null}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      style={{ top: '2vh' }}
    >
      <Collapse>
        {Array.from(
          { length: modalContent.team_members_count },
          ( _, i ) => i+1
        ).map( ( el, i ) => {
          return (
            <Panel header={modalContent[ `member_${el}_name` ]} key={i}>
              <Descriptions layout='vertical' bordered>
                <Descriptions.Item
                  labelStyle={{ fontWeight: 'bold' }}
                  style={{ textAlign: 'center' }}
                  label='Email'
                >
                  {modalContent[ `member_${el}_email` ]}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{ fontWeight: 'bold' }}
                  style={{ textAlign: 'center' }}
                  label='CNIC'
                >
                  {modalContent[ `member_${el}_cnic` ]}
                </Descriptions.Item>
                <Descriptions.Item
                  labelStyle={{ fontWeight: 'bold' }}
                  style={{ textAlign: 'center' }}
                  label='Phone'
                >
                  {modalContent[ `member_${el}_phone` ]}
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          )
        } )}
      </Collapse>
      <Descriptions title="Other details" style={{ marginTop: '1.5rem' }} size={'default'} extra={<Button type="primary">Edit</Button>}>
        <Descriptions.Item label="Institute">{modalContent.institute}</Descriptions.Item>
        <Descriptions.Item label="Team Lead">{modalContent.member_1_name}</Descriptions.Item>
        <Descriptions.Item label="Accomodation">{Number( modalContent.accomodation_count )? `${Number( modalContent.accomodation_count )} person${Number( modalContent.accomodation_count )===1? '':'s'}`:'No accomodation'}</Descriptions.Item>
        <Descriptions.Item label="Promo Code">{modalContent.promo_code}</Descriptions.Item>
        <Descriptions.Item label="Amount Paid">{modalContent.total} PKR</Descriptions.Item>
        <Descriptions.Item label="Status"><span className='text-[green]'>{modalContent.status}</span></Descriptions.Item>
        <Descriptions.Item label="Competition">{modalContent.competition}</Descriptions.Item>
      </Descriptions>
      <h4 className='font-[600] text-[16px]'>Receipt</h4>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
        <Image width={200} src={modalContent.imageUrl} />
      </div>
    </Modal>
  )
}

const ApplicantTable=( { messageApi, competitionType } ) => {
  const [ isModalOpen, setIsModalOpen ]=useState( false )
  const messagesRef=collection( db, 'registrations' )
  const [ applicants, setApplicants ]=useState( null )
  const [ modelData, setModelData ]=useState( null )
  const { confirm }=Modal;

  const [ searchedText, setSearchedText ]=useState( '' )
  const [ filteredApplicants, setFilteredApplicants ]=useState( [] )
  const [ filteredInfo, setFilteredInfo ]=useState( {} );
  const [ filteredCount, setFilteredCount ]=useState( null );

  const handleChange=( pagination, filters, sorter, data ) => {
    setFilteredInfo( filters );
    setFilteredCount( data.currentDataSource.length )
  };

  const onSearch=e => {
    setSearchedText( e.target.value.toLowerCase() )
  }


  const showModal=() => {
    setIsModalOpen( true )
  }
  const handleOk=() => {
    setIsModalOpen( false )
  }
  const handleCancel=() => {
    setModelData( null )
    setIsModalOpen( false )
  }

  useEffect( () => {
    if ( searchedText ) {
      setFilteredApplicants( applicants.filter( el => el.teamName.toLowerCase().includes( searchedText )||el.institute.toLowerCase().includes( searchedText ) ) )
    }
    else {
      setFilteredApplicants( [] )
    }

  }, [ searchedText ] )

  useEffect( () => {
    const queryMessages=query(
      messagesRef,
      where( 'status', '==', 'approved' ),
      where( 'competition', '==', competitionType ),
      orderBy( 'createdAt' )
    )
    const unsuscribe=onSnapshot( queryMessages, snapshot => {
      let applicants=[]
      let i=1;
      snapshot.forEach( doc => {
        let campus=doc.data().member_1_email[ 2 ]==='d'||doc.data().member_1_email[ 7 ]==='5'? 'NC':'OC';
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
      } )
      setApplicants( applicants )
    } )

    return () => unsuscribe()
  }, [] )

  const columns=[
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
      title: 'Institute',
      dataIndex: 'institute',
      key: 'institute',
      width: '10%',
      ellipsis: true,
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

    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      render: ( _, record ) => (
        <>
          <Tooltip title='View Team info'>
            <span
              onClick={() => {
                setModelData( record.teamData )
                showModal( true )
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
          placeholder='Search by Team name or Institute'
          style={{ marginBottom: '0.3rem', width: '35rem' }}
          enterButton
          onChange={onSearch}
        />
        {applicants&&<Button className='clear_btn'>
          <CSVLink
            filename={"ApprovedTeam.csv"}
            data={applicants.map( ( el ) => {
              let retData={ ...el.teamData }
              delete retData.createdAt;
              delete retData.status;
              return retData
            } )}
            className="btn btn-primary"
          >
            Export to CSV
          </CSVLink>
        </Button>}
        {<Table columns={columns} onChange={handleChange} dataSource={searchedText? filteredApplicants:applicants} title={currData => {
          return <p className='font-bold'>Results: {filteredCount==0||filteredCount? filteredCount:searchedText? currData.length:applicants?.length}</p>
        }
        } size='middle' />}
        {modelData&&(
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

const ApprovedTeams=( { competitionType } ) => {
  const [ messageApi, contextHolder ]=message.useMessage();
  return (
    <>
      {contextHolder}
      <div className='px-[100px]'>
        <Header heading={competitionType} add_btn={false} />
        <div style={{ marginTop: '2rem' }}>
          <ApplicantTable competitionType={competitionType} messageApi={messageApi} />
        </div>
      </div>
    </>
  )
}

export default ApprovedTeams
