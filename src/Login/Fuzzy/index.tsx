import * as React from 'react'
import './index.less'
import LoginForm from '@/src/Login/_utils/LoginForm'

export interface FuzzyProps {
  onFinish: (value: any) => any
}

const Fuzzy: React.FC<FuzzyProps> = (props) => {
  return (
    <div className="login">
      <div className="header">
        <img src={require('./images/text-header.png')} alt="text" />
      </div>
      <div className="content">
        <LoginForm
          loginButton={{ type: 'img' }}
        />
      </div>
      <div className="footer">
        <div className="textWrapper">
          <span>版权所有：无锡惠泰</span>
          <span>技术支持：伏泰•环境云提供云计算服务</span>
        </div>
      </div>
    </div>
  )
}

export default Fuzzy
