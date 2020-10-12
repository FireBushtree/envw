import React from 'react';
import LoginForm, { CommonLoginApi } from '@/src/Login/_utils/LoginForm';
import './index.less';

export type SimpleProps = CommonLoginApi & {
  backgroundImages?: Array<string> | string;
};

const Simple: React.FC<SimpleProps> = (props) => {
  const { onFinish, syncToken } = props;
  let imageTimer = null;

  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);
  const wrapStyles = {} as React.CSSProperties;

  let { backgroundImages } = props;

  if (backgroundImages) {
    if (typeof backgroundImages === 'string') {
      backgroundImages = [backgroundImages];
    }

    wrapStyles.backgroundImage = `url(${backgroundImages[currentBgIndex]})`;
  }

  React.useEffect(() => {
    if (backgroundImages && backgroundImages.length > 0) {
      clearInterval(imageTimer);
      imageTimer = null;

      const maxIndex = backgroundImages.length;
      let nextIndex = currentBgIndex;

      imageTimer = setInterval(() => {
        nextIndex = nextIndex + 1 === maxIndex ? 0 : nextIndex + 1;
        setCurrentBgIndex(nextIndex);
      }, 6000);
    }
  }, [backgroundImages]);

  return (
    <div style={wrapStyles} className="qw-simple">
      <div className="qw-simple-form">
        <LoginForm
          showCopyright={false}
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
