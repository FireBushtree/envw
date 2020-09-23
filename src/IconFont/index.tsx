import * as React from 'react';

export interface IconFontProps {
  name: string;
  fontSize?: number;
}

const IconFont: React.FC<IconFontProps> = (props) => {
  const { fontSize, name } = props;
  return <span style={{ fontSize }} className={`iconfont ${name}`} />;
};

export default IconFont;
