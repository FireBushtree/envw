import * as React from 'react';
import './index.less';
import LoginForm from '@/src/Login/_utils/LoginForm';

export interface FuzzyProps {
  onFinish?: (value: any) => any;
  header: React.ReactElement | String;
}

const Fuzzy: React.FC<FuzzyProps> = (props) => {
  const { header } = props;

  return (
    <div className="login">
      <div className="header">{header}</div>
      <div className="content">
        <LoginForm showCopyright={false} loginButton={{ type: 'img' }} />
      </div>
      <div className="footer">
        <div className="textWrapper">
          <span>版权所有：无锡惠泰</span>
          <span>技术支持：伏泰•环境云提供云计算服务</span>
        </div>
      </div>
    </div>
  );
};

export default Fuzzy;
