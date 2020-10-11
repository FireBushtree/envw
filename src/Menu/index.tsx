import * as React from 'react';
import './index.less';
import { Layout, Menu as AntMenu, Popover } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FolderOutlined,
  FileTextOutlined,
  RetweetOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import Avatar from 'antd/lib/avatar/avatar';
import { getUrlParam } from '../_utils/common';
import { getMenu, getUser } from '../_utils/service/auth';
import Iframe from './_utils/Iframe';
import welcomeImg from './images/welcome.png';

const { Header, Content, Sider } = Layout;
const { SubMenu } = AntMenu;

export interface MenuProps {
  systemName: string;
  logo: string;
}

const formatSystemList = (systemStr: string) => {
  if (!systemStr) {
    return [];
  }

  const system: Array<string> = JSON.parse(systemStr);
  const systemList = [] as Array<{ name: string; code: string }>;

  system.forEach((item) => {
    const [code, name] = item.split('||');
    systemList.push({ name, code });
  });

  return systemList;
};

const Menu: React.FC<MenuProps> = (props) => {
  // 防止title为`undefined`转义为字符， 所以做空字符串处理
  const title = decodeURI(getUrlParam('title') || '');
  const token = getUrlParam('token');
  const userId = getUrlParam('userId');
  const tenantId = getUrlParam('tenantId');
  const systemCode = getUrlParam('systemCode');
  const { systemName, logo } = props;

  const { data: user } = useRequest(getUser);
  const { name: username = '', systemList = '' } = user?.data || {};

  React.useEffect(() => {
    document.title = title || systemName;
  });

  const { data } = useRequest(() =>
    getMenu({
      userId,
      tenantId,
      systemCode,
    }),
  );

  const [collapsed, setCollapsed] = React.useState(false);
  const [iframeUrl, setIframeUrl] = React.useState('');

  const handleMenuChange = (url: string) => {
    setIframeUrl(
      `${url}?tenantId=${tenantId}&userId=${userId}&token=${token}&access_token=${token}`,
    );
  };

  const menuObj = JSON.parse(data?.data || '{}');
  const handleLogout = () => {};

  const generateMenu = (menus: Array<any>) => {
    if (menus.length === 0) {
      return;
    }

    return menus.map((item) => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        return (
          <SubMenu icon={<FolderOutlined />} key={item.id} title={item.name}>
            {generateMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <AntMenu.Item
          icon={<FileTextOutlined />}
          key={item.id}
          onClick={() => handleMenuChange(item.uri)}
        >
          {item.name}
        </AntMenu.Item>
      );
    });
  };

  return (
    <Layout className="qw-menu" style={{ minHeight: '100vh' }}>
      <Sider width={256} trigger={null} collapsible collapsed={collapsed}>
        <div className="qw-menu-title">
          <Avatar src={logo} />
          {!collapsed && <span className="qw-menu-logo">{title || systemName}</span>}
        </div>
        <AntMenu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {generateMenu(menuObj?.children || [])}
        </AntMenu>
      </Sider>
      <Layout>
        <Header className="qw-menu-header">
          <div className="qw-menu-header-left">
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(false)} className="qw-menu-trigger" />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(true)} className="qw-menu-trigger" />
            )}
          </div>
          <div className="qw-menu-header-right">
            <div className="qw-menu-logout">
              {/* <Popconfirm
                placement="bottomRight"
                title="确认退出登录吗?"
                onConfirm={handleLogout}
                okText="确定"
                cancelText="取消"
              >
                123
              </Popconfirm> */}
            </div>

            <Popover
              overlayClassName="qw-menu-popover"
              placement="bottom"
              trigger="click"
              content={
                <ul className="qw-menu-system-wrap">
                  <li className="qw-menu-system-user-item">
                    <SettingOutlined />
                    <span>修改密码</span>
                  </li>
                  <li className="qw-menu-system-user-item">
                    <LogoutOutlined />
                    <span>退出登录</span>
                  </li>
                </ul>
              }
            >
              <span className="qw-menu-user">
                <UserOutlined className="qw-menu-user-icon" />
                {username}
              </span>
            </Popover>

            <Popover
              overlayClassName="qw-menu-popover"
              trigger="click"
              placement="bottom"
              content={
                <ul className="qw-menu-system-wrap">
                  {formatSystemList(systemList).map((item) => (
                    <li key={item.code} className="qw-menu-system-item">
                      {item.name}
                    </li>
                  ))}
                </ul>
              }
            >
              <span className="qw-menu-top-hover">
                <RetweetOutlined />
              </span>
            </Popover>
          </div>
        </Header>
        <Content>
          {iframeUrl ? (
            <Iframe url={iframeUrl} />
          ) : (
            <div className="qw-menu-empty-frame">
              <img src={welcomeImg} alt="welcome" />
              <div className="qw-menu-empty-frame-title">
                欢迎使用
                {systemName}
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Menu;
