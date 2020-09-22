import React from 'react'
import LoginForm, { OnFinish } from '@/src/Login/_utils/LoginForm'
import './index.less'

export interface SimpleProps {
  onFinish: OnFinish
}

const Simple: React.FC<SimpleProps> = (props) => {
  return (
    <div className="qw-simple">
      <div className="qw-simple-form">
        <LoginForm
          onFinish={props.onFinish}
          loginButton={{
            align: 'right',
            className: 'qw-simple-form-login-button'
          }}
          className="qw-simple-form-content"
          showFormLabel={false}
          title={<div className="qw-simple-form-title">登录</div>}
        />
      </div>
    </div>
  )
}

export default Simple
