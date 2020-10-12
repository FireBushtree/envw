import * as React from 'react';
import { Login } from 'wind';
import one from './images/1.jpg';
import two from './images/3.jpg';
import three from './images/4.jpg';

const { Simple } = Login;

const SimpleDemo = () => (
  <Simple
    backgroundImages={[one, two, three]}
    onFinish={(user) => {
      console.log(user);
    }}
  />
);

export default SimpleDemo;
