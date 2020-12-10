import * as React from 'react';
import { Menu } from 'envw';

const MenuDemo = () => (
  <Menu
    onLogout={() => {
      // TODO 跳转页面啥啥啥的
    }}
    logo={<img src={require('./images/logo-lvhuan.png')} alt="logo" />}
    systemName="江北新区智慧环卫一体化平台"
  />
);

export default MenuDemo;
