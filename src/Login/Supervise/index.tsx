import * as React from 'react'
import LoginForm, { User } from 'components/Login/_utils/LoginForm'
import './index.less'

export interface SuperviseProps {
  onFinish: (user: User) => any
}

const Supervise: React.FC<SuperviseProps> = (props) => {
  return (
    <div className="qw-login-supervise">
      <div className="qw-login-supervise-content">
        <div className="qw-login-supervise-form">
          <LoginForm
            title="江北新区智慧环卫一体化监管平台"
            theme="line"
            showFormIcon={true}
            showFormLabel={false}
            onFinish={props.onFinish}
          />
        </div>
      </div>
    </div>
  )
}

export default Supervise