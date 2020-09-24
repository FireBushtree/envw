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

const Wisdom: React.FC<WisdomProps> = (props) => {
  const { navs } = props;
  return (
    <div className="qw-nav-widsom">
      <div className="qw-nav-widsom-header" />
      <div className="qw-nav-widsom-content">
        {navs.map((item, index) => (
          <div
            key={item.name}
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
