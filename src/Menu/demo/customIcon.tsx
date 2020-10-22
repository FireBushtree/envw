import * as React from 'react';
import { Menu } from 'envw';
import {
  BorderOuterOutlined,
  FormOutlined,
  PicLeftOutlined,
  QuestionCircleOutlined,
  StepBackwardOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';

const CustomIconDemo = () => {
  // 大部分情况下会使用UI设计的iconfont, 并不是来自于antd的icon， 此时建议在覆写icon的时候以如下格式:
  // className="anticon"是比较关键的点

  // <span className="anticon">
  //  <i style={{ fontSize: '16px' }} className={your-icon-name} />
  // </span>

  const [useDefaultIcon, setUseDefaultIcon] = React.useState(true);

  return (
    <div>
      <div style={{ paddingBottom: '10px' }}>
        <Button type="primary" onClick={() => setUseDefaultIcon(true)}>
          使用默认icon
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={() => setUseDefaultIcon(false)}>
          取消默认icon
        </Button>
      </div>
      <Menu
        useDefaultIcon={useDefaultIcon}
        logoutPage="/test"
        systemName="农村垃圾分类平台"
        formatMenu={(menu) => {
          const icons = [
            <StepBackwardOutlined />,
            <BorderOuterOutlined />,
            <PicLeftOutlined />,
            <QuestionCircleOutlined />,
            <FormOutlined />,
            <StrikethroughOutlined />,
          ];

          if (menu.children) {
            menu.children.forEach((item, index) => {
              // eslint-disable-next-line no-param-reassign
              item.icon = icons[index];
            });
          }

          return menu;
        }}
      />
    </div>
  );
};

export default CustomIconDemo;
