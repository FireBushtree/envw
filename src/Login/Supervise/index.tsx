import * as React from 'react';
import LoginForm, { User } from '@/src/Login/_utils/LoginForm';
import './index.less';

export interface SuperviseProps {
  onFinish?: (user: User) => any;
  header: React.ReactElement | string;
}

const Supervise: React.FC<SuperviseProps> = (props) => {
  const { onFinish, header } = props;
  return (
    <div className="qw-login-supervise">
      <div className="qw-login-supervise-content">
        <div className="qw-login-supervise-form">
          <LoginForm
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

export default Supervise;
