import * as React from 'react';
import { Login } from 'envw';

const { Fuzzy } = Login;

const FuzzyDemo = () => (
  <Fuzzy
    copyright="无锡汇泰"
    header={<img src={require('./images/text-header.png')} alt="text" />}
    onFinish={(val) => {
      console.log(val);
    }}
  />
);

export default FuzzyDemo;
