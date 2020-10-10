import * as React from 'react';
import { Login } from 'wind';
import textHeader from './images/text-header.png';

const { Fuzzy } = Login;

const FuzzyDemo = () => (
  <Fuzzy
    copyright="无锡汇泰"
    header={<img src={textHeader} alt="text" />}
    onFinish={(val) => {
      console.log(val);
    }}
  />
);

export default FuzzyDemo;
