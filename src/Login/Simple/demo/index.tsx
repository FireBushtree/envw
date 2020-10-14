import * as React from 'react';
import { Login } from 'envw';

const { Simple } = Login;

const SimpleDemo = () => (
  <Simple
    errorTime={3}
    onFinish={(user) => {
      console.log(user);
    }}
  />
);

export default SimpleDemo;
