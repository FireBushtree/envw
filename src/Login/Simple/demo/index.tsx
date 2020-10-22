import * as React from 'react';
import { Login } from 'envw';

const { Simple } = Login;

const SimpleDemo = () => <Simple errorTime={3} onFinish={(user) => {}} />;

export default SimpleDemo;
