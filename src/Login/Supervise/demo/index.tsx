import * as React from 'react';
import { Login } from 'wind';
const { Supervise } = Login;

const SuperviseDemo = () => {
  return (
    <Supervise
      onFinish={() => {
        console.log(123);
      }}
    />
  );
};

export default SuperviseDemo;
