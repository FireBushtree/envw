import React from 'react';
import { message, Form, Input, Button, Col, Row, Spin, Checkbox } from 'antd';
import './index.less';
import { useMount } from 'ahooks';

import md5 from 'md5';
import { login, LoginRes, syncToken } from '@/src/_utils/service/auth';
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import GVerify from '../Gverify';

const REMEMBER_USER_KEY = 'remember_user';
const PASSWORD_ERROR_COUNT = 'password_error_count';

export type User = LoginRes & { accessToken: string };
export type OnFinish = (value: User) => any;
export type CommonLoginApi = {
  syncToken?: boolean;
  onFinish?: OnFinish;
  errorTime?: number;
};

interface LoginButtonProps {
  className?: string;
  type?: 'img' | 'button';
  align?: 'left' | 'right';
}

export type LoginFormProps = {
  theme?: 'base' | 'line';
  className?: string;
  showFormIcon?: boolean;
  showFormLabel?: boolean;
  showCopyright?: boolean;
  title?: React.ReactElement | string;
  loginButton?: LoginButtonProps;
  showRememberUsername?: boolean;
} & CommonLoginApi;

const defaultLoginButtonProps = {
  type: 'button',
  align: 'left',
} as LoginButtonProps;

const LoginForm: React.FC<LoginFormProps> = (props) => {
  // const generateGverifyId = `${Math.random()}${new Date().getTime()}`;
  const [captcha, setCaptcha] = React.useState({} as GVerify);
  const [loginning, setLoginning] = React.useState(false);
  const [rememberUsername, setRememberUsername] = React.useState(false);

  useMount(() => {
    // 1. 生成验证码
    const gverify = new GVerify({
      containerId: 'gverify',
    });
    setCaptcha(gverify);

    // 2. 获取是否记住用户名
    const isRememberStr = localStorage.getItem(REMEMBER_USER_KEY);
    const isRemember = JSON.parse(isRememberStr || 'false');
    setRememberUsername(isRemember);
  });

  const getErrorCount = () => {
    const errorCountStr = sessionStorage.getItem(PASSWORD_ERROR_COUNT);
    const errorCount = JSON.parse(errorCountStr || '0');

    return errorCount;
  };

  // 是否输入密码超出限制， 超过次数过多则显示验证码
  const isErrorLimit = () => {
    const errorCount = getErrorCount();

    if (errorCount >= props.errorTime) {
      return true;
    }

    return false;
  };

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
      const errorCount = getErrorCount();
      sessionStorage.setItem(PASSWORD_ERROR_COUNT, errorCount + 1);

      if (errorCount + 1 >= props.errorTime) {
        if (errorCount + 1 === props.errorTime) {
          setTimeout(() => {
            const gverify = new GVerify({
              containerId: 'gverify',
            });
            setCaptcha(gverify);
          });
        }
      }

      message.error('用户名或密码错误');
      return;
    } finally {
      setLoginning(false);
    }

    const tokenStr = res.headers['access-token'];
    const token = JSON.parse(tokenStr);

    // 同步token
    if (props.syncToken) {
      syncToken(token.access_token);
    }

    const userInfo = { ...res.data, accessToken: token.access_token };

    // 执行回调函数
    const { onFinish: propOnFinish } = props;
    if (propOnFinish) {
      propOnFinish(userInfo);
    }
  };

  const {
    theme,
    className,
    title,
    showFormLabel,
    showFormIcon,
    showCopyright,
    showRememberUsername,
  } = props;

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

          {isErrorLimit() && (
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
                  <div style={{ width: '100%', height: '32px' }} id="gverify" />
                </Col>
              </Row>
            </Form.Item>
          )}

          <Form.Item className={`${loginButton.align === 'right' ? 'is-right' : ''} qw-entry-wrap`}>
            {showRememberUsername && (
              <div className="qw-form-item-remember">
                <Checkbox
                  checked={rememberUsername}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setRememberUsername(checked);
                    localStorage.setItem(REMEMBER_USER_KEY, JSON.stringify(checked));
                  }}
                >
                  记住用户名
                </Checkbox>
              </div>
            )}

            {loginButton.type === 'img' && (
              <Button
                className={`${loginButton.className} qw-login-button qw-img-entry`}
                type="primary"
                htmlType="submit"
              >
                <img src={require('./images/btn-enter.png')} alt="login" />
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
  title: <img src={require('./images/icon-user.png')} alt="user" />,
  loginButton: defaultLoginButtonProps,
  theme: 'base',
  showCopyright: true,
  syncToken: false,
  showRememberUsername: false,
  errorTime: 0,
};

export default LoginForm;
