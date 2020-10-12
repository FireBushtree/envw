import * as React from 'react';
import { Menu } from 'wind';

const MenuDemo = () => (
  <Menu
    logoutPage="/test"
    logo={require('./images/logo.png')}
    systemName="江北新区智慧环卫一体化平台"
  />
);

export default MenuDemo;
