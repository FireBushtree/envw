import * as React from 'react';
import './index.less';
import LoginForm, { OnFinish } from '@/src/Login/_utils/LoginForm';

export interface FuzzyProps {
  onFinish?: OnFinish;
  header: React.ReactElement | String;
  formBackgroundImage?: string;
  backgroundImage?: string;
  copyright: React.ReactElement | String;
}

const Fuzzy: React.FC<FuzzyProps> = (props) => {
  const { header, formBackgroundImage, backgroundImage, copyright } = props;

  const wrapStyle = {} as React.CSSProperties;
  const formStyle = {} as React.CSSProperties;

  if (backgroundImage) {
    wrapStyle.backgroundImage = `url${backgroundImage}`;
  }

  if (formBackgroundImage) {
    formStyle.backgroundImage = `url(${formBackgroundImage})`;
  }

  return (
    <div style={wrapStyle} className="login">
      <div className="header">{header}</div>
      <div style={formStyle} className="content">
        <LoginForm showCopyright={false} loginButton={{ type: 'img' }} />
      </div>
      <div className="footer">
        <div className="textWrapper">
          <span>
            版权所有：
            {copyright}
          </span>
          <span>技术支持：伏泰•环境云提供云计算服务</span>
        </div>
      </div>
    </div>
  );
};

export default Fuzzy;
