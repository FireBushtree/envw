import React from 'react';
import classnames from 'classnames';
import { Tooltip } from 'antd';
import './index.less';

export interface ThemeProps {
  onChange: () => any;
}

const Theme: React.FC<ThemeProps> = (props) => {
  const { onChange } = props;
  const [theme, setTheme] = React.useState(0); // 0 是暗色主体， 1 是亮色主体

  return (
    <Tooltip placement="bottom" title="切换主题">
      <div
        className={classnames('qw-menu-theme', 'qw-menu-top-hover', {
          'is-light': theme === 0,
        })}
        onClick={() => {
          onChange();
          setTheme(theme === 0 ? 1 : 0);
        }}
      />
    </Tooltip>
  );
};

export default Theme;
