import * as React from 'react';
import { Menu } from 'envw';

const MenuDemo = () => (
  <Menu
    staticMenu={[
      {
        name: '菜单1',
        children: [
          {
            name: '子菜单1-1',
            uri: 'http://jbxq.ljfl.envcloud.com.cn:9391/static/bg-supervise.4cf4a975.png',
          },
          {
            name: '子菜单1-2',
            uri: 'http://jbxq.ljfl.envcloud.com.cn:9391/static/welcome.1677c493.png',
          },
        ],
      },
      {
        name: '菜单2',
        children: [
          {
            name: '子菜单2-1',
            uri: 'http://jbxq.ljfl.envcloud.com.cn:9391/static/bg-supervise.4cf4a975.png',
          },
          {
            name: '子菜单2-2',
            uri: 'http://jbxq.ljfl.envcloud.com.cn:9391/static/welcome.1677c493.png',
          },
        ],
      },
    ]}
    onLogout={() => {
      // TODO 跳转页面啥啥啥的
    }}
    systemName="农村垃圾分类"
    showSystemList={false}
  />
);

export default MenuDemo;
