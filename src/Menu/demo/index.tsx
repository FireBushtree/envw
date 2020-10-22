import * as React from 'react';
import { Menu } from 'envw';

const MenuDemo = () => (
  <Menu
    logoutPage="/test"
    logo={<img src={require('./images/logo.png')} alt="logo" />}
    systemName="江北新区智慧环卫一体化平台"
  />
);

export default MenuDemo;
