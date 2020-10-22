import * as React from 'react';
import { Login } from 'envw';

const { Fuzzy } = Login;

const FuzzyDemo = () => (
  <Fuzzy
    copyright="南京市玄武区"
    header="南京市玄武区垃圾分类智慧监管平台"
    onFinish={(val) => {}}
    backgroundImage={require('./images/bg-xwh-login.jpg')}
    formBackgroundImage={require('./images/bg-xwh-form.png')}
  />
);

export default FuzzyDemo;
