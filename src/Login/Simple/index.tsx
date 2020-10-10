import React from 'react';
import LoginForm, { CommonLoginApi } from '@/src/Login/_utils/LoginForm';
import './index.less';

export type SimpleProps = CommonLoginApi & {};

const Simple: React.FC<SimpleProps> = (props) => {
  const { onFinish, syncToken } = props;

  return (
    <div className="qw-simple">
      <div className="qw-simple-form">
        <LoginForm
          syncToken={syncToken}
          onFinish={onFinish}
          loginButton={{
            align: 'right',
            className: 'qw-simple-form-login-button',
          }}
          className="qw-simple-form-content"
          showFormLabel={false}
          title={<div className="qw-simple-form-title">登录</div>}
        />
      </div>
    </div>
  );
};

Simple.defaultProps = {
  syncToken: false,
};

export default Simple;
