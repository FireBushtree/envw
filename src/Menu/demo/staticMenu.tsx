import * as React from 'react';
import { Menu } from 'envw';

const MenuDemo = () => (
  <Menu
    staticMenu={[
      {
        name: '菜单1',
        children: [
          {
            name: '子菜单1',
            uri: 'http://jbxq.ljfl.envcloud.com.cn:9391/static/bg-supervise.4cf4a975.png',
          },
          {
            name: '子菜单2',
            uri: 'http://jbxq.ljfl.envcloud.com.cn:9391/static/welcome.1677c493.png',
          },
        ],
      },
    ]}
    logoutPage="/test"
    systemName="农村垃圾分类"
    showSystemList={false}
  />
);

export default MenuDemo;
