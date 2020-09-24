import * as React from 'react';
import './index.less';
import LoginForm from '@/src/Login/_utils/LoginForm';
import textHeader from './images/text-header.png';

export interface FuzzyProps {
  onFinish: (value: any) => any;
}

const Fuzzy: React.FC<FuzzyProps> = (props) =>
  (
    <div className="login">
      <div className="header">
        <img src={textHeader} alt="text" />
      </div>
      <div className="content">
        <LoginForm loginButton={{ type: 'img' }} />
      </div>
      <div className="footer">
        <div className="textWrapper">
          <span>版权所有：无锡惠泰</span>
          <span>技术支持：伏泰•环境云提供云计算服务</span>
        </div>
      </div>
    </div>
  );

export default Fuzzy;
