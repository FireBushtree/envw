import React from 'react';
import './index.less';

interface NavBlock {
  name: string;
  color?: string;
  systemCode?: string;
}

export interface WisdomProps {
  navs: Array<NavBlock>;
}

const Wisdom: React.FC<WisdomProps> = props => {
  return (
    <div className="qw-nav-widsom">
      <div className="qw-nav-widsom-header"></div>
      <div className="qw-nav-widsom-content">
        {props.navs.map((item, index) => (
          <div
            key={index}
            style={{ background: item.color || '' }}
            className="qw-nav-widsom-nav-block"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wisdom;
