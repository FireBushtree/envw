import * as React from 'react';
import { Menu } from 'wind';
import logo from './images/logo.png';

const MenuDemo = () => (
  <Menu logoutPage="/test" logo={logo} systemName="江北新区智慧环卫一体化平台" />
);

export default MenuDemo;
