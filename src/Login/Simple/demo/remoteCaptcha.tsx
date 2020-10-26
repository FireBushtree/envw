import * as React from 'react';
import { Login } from 'envw';

const { Simple } = Login;

const RemoteCodeDemo = () => <Simple remoteCode onFinish={(user) => {}} />;

export default RemoteCodeDemo;
