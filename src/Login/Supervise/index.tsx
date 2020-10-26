import * as React from 'react';
import LoginForm, { CommonLoginApi, defaultLoginCommonProps } from '@/src/Login/_utils/LoginForm';
import './index.less';

export type SuperviseProps = CommonLoginApi & {
  header: React.ReactElement | string;
};

const Supervise: React.FC<SuperviseProps> = (props) => {
  const { onFinish, header, syncToken, showRememberUsername, remoteCode } = props;
  return (
    <div className="qw-login-supervise">
      <div className="qw-login-supervise-content">
        <div className="qw-login-supervise-form">
          <LoginForm
            showRememberUsername={showRememberUsername}
            remoteCode={remoteCode}
            syncToken={syncToken}
            title={header}
            theme="line"
            showFormIcon
            showFormLabel={false}
            onFinish={onFinish}
          />
        </div>
      </div>
    </div>
  );
};

Supervise.defaultProps = {
  ...defaultLoginCommonProps,
};

export default Supervise;
