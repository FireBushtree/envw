import * as React from 'react';

export interface IconFontProps {
  name: string,
  fontSize?: number
}

const IconFont: React.FC<IconFontProps> = (props) => {
  return (
    <span style={{ fontSize: props.fontSize }} className={`iconfont ${props.name}`}></span>
  )
}

export default IconFont
