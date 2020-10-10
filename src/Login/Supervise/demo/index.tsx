import * as React from 'react';
import { Login } from 'wind';

const { Supervise } = Login;

const SuperviseDemo = () => (
  <Supervise
    header="江北新区一智能环卫体化平台"
    onFinish={(user) => {
      console.log(user);
    }}
  />
);

export default SuperviseDemo;
