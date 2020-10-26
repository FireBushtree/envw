import * as React from 'react';
import './index.less';
import LoginForm, { CommonLoginApi, defaultLoginCommonProps } from '@/src/Login/_utils/LoginForm';

export type FuzzyProps = CommonLoginApi & {
  header: React.ReactElement | String;
  formBackgroundImage?: string;
  backgroundImage?: string;
  copyright: React.ReactElement | String;
};

const Fuzzy: React.FC<FuzzyProps> = (props) => {
  const {
    header,
    formBackgroundImage,
    backgroundImage,
    copyright,
    syncToken,
    showRememberUsername,
    remoteCode,
  } = props;

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
        <LoginForm
          showRememberUsername={showRememberUsername}
          remoteCode={remoteCode}
          syncToken={syncToken}
          showCopyright={false}
          loginButton={{ type: 'img' }}
        />
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

Fuzzy.defaultProps = {
  ...defaultLoginCommonProps,
};

export default Fuzzy;
