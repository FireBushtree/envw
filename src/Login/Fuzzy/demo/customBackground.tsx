import * as React from 'react';
import { Login } from 'wind';
import formBg from './images/bg-xwh-form.png';
import wrapBg from './images/bg-xwh-login.jpg';

const { Fuzzy } = Login;

const FuzzyDemo = () => (
  <Fuzzy
    copyright="南京市玄武区"
    header="南京市玄武区垃圾分类智慧监管平台"
    onFinish={(val) => {
      console.log(val);
    }}
    backgroundImage={wrapBg}
    formBackgroundImage={formBg}
  />
);

export default FuzzyDemo;
