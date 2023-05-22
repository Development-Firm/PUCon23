import React from 'react'
import Cookies from 'js-cookie'
import './Dashboard.css'
import {
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Collapse } from 'antd'
import { StarsCanvas } from '../canvas'
const { Panel }=Collapse

const Dashboard=() => {
  const location=useLocation()
  let navigate=useNavigate()
  const handleLogout=e => {
    e.preventDefault()
    Cookies.remove( 'jwt' )
    navigate( '/login' )
  }
  const items=[
    {
      key: '1',
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined />
          &nbsp;Logout
        </span>
      )
    }
  ]

  return (
    <>
      <div>
        <div className='header_main'>
          <span style={{ fontWeight: 'bold', color: '#050816' }}>Welcome, Admin</span>
          <div>
            <Dropdown
              menu={{
                items
              }}
              placement='bottom'
            >
              <Avatar size='medium' icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
        <div className='main'>
          <div className='left-bar bg-[#050816]'>
            <div
              style={{
                padding: '3rem 0rem',
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Dashboard
            </div>
            <div className='left-content'>
              <ul className='action-list'>

                <li className='item text-white'>
                  <Link
                    to='/dashboard/approved_teams'
                    style={{ textDecoration: 'none', color: 'black' }}
                    className={`${location.pathname.endsWith( 'approved_teams' )
                      ? 'side_active'
                      :''
                      }`}
                  >

                  </Link>
                </li>

                <Collapse ghost expandIconPosition='end'>
                  <Panel
                    header={
                      <>
                        <span style={{ color: 'white' }}> <CheckSquareOutlined style={{ color: 'white', margin: '5px' }} />Approved Teams</span>
                      </>
                    }
                    key='1'
                  >
                    <ul>
                      <li className='nested_item'>
                        <Link
                          to='/dashboard/approved_teams/web'
                          style={{ textDecoration: 'none', color: 'white' }}
                          className={`${location.pathname.endsWith( 'web' )||
                            location.pathname.includes( 'web' )
                            ? 'nested_side_active'
                            :''
                            }`}
                        >
                          Web Hackathon
                        </Link>
                      </li>
                      <li className='nested_item'>
                        <Link
                          to='/dashboard/approved_teams/mobile'
                          style={{ textDecoration: 'none', color: 'white' }}
                          className={`${location.pathname.endsWith( 'mobile' )||
                            location.pathname.includes( 'mobile' )
                            ? 'nested_side_active'
                            :''
                            }`}
                        >
                          Mobile Hackathon
                        </Link>
                      </li>
                      <li className='nested_item'>
                        <Link
                          to='/dashboard/approved_teams/code'
                          style={{ textDecoration: 'none', color: 'white' }}
                          className={`${location.pathname.endsWith( 'code' )||
                            location.pathname.includes( 'code' )
                            ? 'nested_side_active'
                            :''
                            }`}
                        >
                          Code Bees
                        </Link>
                      </li>

                    </ul>
                  </Panel>
                </Collapse>


                <li className='item text-white'>
                  <Link
                    to='/dashboard/applicants'
                    style={{ textDecoration: 'none', color: 'black' }}
                    className={`${location.pathname.endsWith( 'applicants' )
                      ? 'side_active'
                      :''
                      }`}
                  >
                    <span style={{ color: 'white' }}> <UserOutlined style={{ color: 'white' }} />Applicants</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='page-content '>
            <Outlet />
            <StarsCanvas />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
