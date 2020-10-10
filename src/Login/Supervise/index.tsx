import * as React from 'react';
import LoginForm, { CommonLoginApi } from '@/src/Login/_utils/LoginForm';
import './index.less';

export type SuperviseProps = CommonLoginApi & {
  header: React.ReactElement | string;
};

const Supervise: React.FC<SuperviseProps> = (props) => {
  const { onFinish, header, syncToken } = props;
  return (
    <div className="qw-login-supervise">
      <div className="qw-login-supervise-content">
        <div className="qw-login-supervise-form">
          <LoginForm
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
  syncToken: false,
};

export default Supervise;
