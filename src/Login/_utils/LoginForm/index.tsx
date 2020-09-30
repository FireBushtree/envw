import React from 'react';
import { message, Form, Input, Button, Col, Row, Spin } from 'antd';
import './index.less';
import { useMount } from 'ahooks';

import md5 from 'md5';
import { login, LoginRes, syncToken } from '@/src/_utils/service/auth';
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import GVerify from '../Gverify';
import btnEnter from './images/btn-enter.png';
import iconUser from './images/icon-user.png';

export type User = LoginRes & { accessToken: string };

export type OnFinish = (value: User) => any;

interface LoginButtonProps {
  className?: string;
  type?: 'img' | 'button';
  align?: 'left' | 'right';
}

export interface LoginFormProps {
  theme?: 'base' | 'line';
  className?: string;
  showFormIcon?: boolean;
  showFormLabel?: boolean;
  showCopyright?: boolean;
  title?: React.ReactElement | string;
  onFinish?: OnFinish;
  loginButton?: LoginButtonProps;
}

const defaultLoginButtonProps = {
  type: 'button',
  align: 'left',
} as LoginButtonProps;

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [captcha, setCaptcha] = React.useState({} as GVerify);
  const [loginning, setLoginning] = React.useState(false);

  useMount(() => {
    const gverify = new GVerify({
      containerId: 'captcha',
    });
    setCaptcha(gverify);
  });

  let { loginButton = {} } = props;
  loginButton = {
    ...defaultLoginButtonProps,
    ...loginButton,
  };

  const onFinish = async (values: any) => {
    let res;
    try {
      setLoginning(true);
      res = await login({
        username: values.username,
        password: md5(values.password),
      });
    } catch {
      message.error('用户名或密码错误');
      return;
    } finally {
      setLoginning(false);
    }

    const tokenStr = res.headers['access-token'];
    const token = JSON.parse(tokenStr);

    // 同步token
    syncToken(token.access_token);

    const userInfo = { ...res.data, accessToken: token.access_token };

    // 执行回调函数
    const { onFinish: propOnFinish } = props;
    if (propOnFinish) {
      propOnFinish(userInfo);
    }
  };

  const { theme, className, title, showFormLabel, showFormIcon, showCopyright } = props;

  return (
    <Spin
      wrapperClassName={`qw-login-form-wrap ${theme === 'line' ? 'is-theme-line' : ''}`}
      spinning={loginning}
    >
      <div className={`${className || ''} qw-login-form`}>
        <div className="qw-login-form-title">{title}</div>
        <Form
          className="qw-form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            className="qw-form-item"
            label={showFormLabel && '用户名:'}
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={showFormIcon && <UserOutlined className="qw-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            className="qw-form-item"
            label={showFormLabel && '密码:'}
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={showFormIcon && <LockOutlined className="qw-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item
            className="qw-form-item"
            label={showFormLabel && '验证码:'}
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              {
                validator: (rule, value) => {
                  if (value && captcha.validate(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('验证码错误'));
                },
                validateTrigger: 'onSubmit',
              },
            ]}
          >
            <Row>
              <Col span={12}>
                <Input
                  prefix={
                    showFormIcon && <SafetyCertificateOutlined className="qw-form-item-icon" />
                  }
                  placeholder="请输入验证码"
                />
              </Col>
              <Col offset={4} span={8}>
                <div style={{ width: '100%', height: '32px' }} id="captcha" />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item className={`${loginButton.align === 'right' ? 'is-right' : ''} qw-entry-wrap`}>
            {loginButton.type === 'img' && (
              <Button
                className={`${loginButton.className} qw-login-button qw-img-entry`}
                type="primary"
                htmlType="submit"
              >
                <img src={btnEnter} alt="login" />
              </Button>
            )}
            {loginButton.type === 'button' && (
              <Button
                className={`${loginButton.className} qw-login-button qw-button-entry`}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            )}
          </Form.Item>
        </Form>
        {showCopyright && (
          <div className="qw-login-form-footer">Copyright © 2020 环境云版权所有保留一切权利</div>
        )}
      </div>
    </Spin>
  );
};

LoginForm.defaultProps = {
  showFormLabel: true,
  showFormIcon: false,
  title: <img src={iconUser} alt="user" />,
  loginButton: defaultLoginButtonProps,
  theme: 'base',
  showCopyright: true,
};

export default LoginForm;
