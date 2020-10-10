import * as React from 'react';
import { Login } from 'wind';

const { Simple } = Login;

const SimpleDemo = () => (
  <Simple
    onFinish={(user) => {
      console.log(user);
    }}
  />
);

export default SimpleDemo;
