import * as React from 'react';
import { Login } from 'envw';

const { Simple } = Login;

const SimpleDemo = () => (
  <Simple
    backgroundImages={[
      require('./images/1.jpg'),
      require('./images/3.jpg'),
      require('./images/4.jpg'),
    ]}
    onFinish={(user) => {}}
  />
);

export default SimpleDemo;
