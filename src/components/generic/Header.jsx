import React from 'react'
import './Header.css'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'

const Header=( { heading, add_btn, link, add_btn_text } ) => {
  return (
    <Row>
      <Col span={20} className='header text-white font-bold'>
        {heading}
      </Col>
      <Col
        span={4}
        style={{
          marginTop: '100px',
          borderBottom: '1px solid rgb(211, 211, 211)'
        }}
      >
        {add_btn&&(
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button>
              <Link to={link}>{add_btn_text}</Link>
            </Button>
          </div>
        )}
      </Col>
    </Row>
  )
}

export default Header
