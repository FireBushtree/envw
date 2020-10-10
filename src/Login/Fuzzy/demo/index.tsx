import * as React from 'react';
import { Login } from 'wind';
import textHeader from './images/text-header.png';

const { Fuzzy } = Login;

const FuzzyDemo = () => (
  <Fuzzy
    header={<img src={textHeader} alt="text" />}
    onFinish={(val) => {
      console.log(val);
    }}
  />
);

export default FuzzyDemo;
