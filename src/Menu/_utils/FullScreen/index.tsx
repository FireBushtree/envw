import React from 'react';
import './index.less';
import { Popover } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';

export interface FullScreenProps {
  onWeb: () => any;
  onWindow: () => any;
}

const FullScreen: React.FC<FullScreenProps> = (props) => {
  const { onWeb, onWindow } = props;

  return (
    <Popover
      overlayClassName="qw-menu-popover"
      placement="bottom"
      content={(
        <ul className="qw-menu-system-wrap">
          <li onClick={onWindow} className="qw-menu-system-user-item">
            <span>窗口全屏</span>
          </li>
          <li onClick={onWeb} className="qw-menu-system-user-item">
            <span>网页全屏</span>
          </li>
        </ul>
      )}
    >
      <span className="qw-menu-top-hover">
        <FullscreenOutlined />
      </span>
    </Popover>
  );
};

export default FullScreen;
