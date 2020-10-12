import * as React from 'react';
import './index.less';
import { Breadcrumb, Layout, Menu as AntMenu, Popover, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FolderOutlined,
  FileTextOutlined,
  RetweetOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import Avatar from 'antd/lib/avatar/avatar';
import { getUrlParam } from '../_utils/common';
import { getMenu, getUser, logout } from '../_utils/service/auth';
import Iframe from './_utils/Iframe';

const { Header, Content, Sider } = Layout;
const { SubMenu } = AntMenu;

export interface MenuProps {
  systemName: string;
  logo: string;
  logoutPage: string;
}

interface MenuNode {
  children: null | MenuNode;
  code: string;
  description: string;
  functionId: null;
  iconFont: string;
  id: string;
  isControlled: number;
  isLeaf: number;
  isWelcomeMenu: number;
  level: number;
  name: string;
  orderIndex: number;
  parentId: string;
  photoIds: string;
  uri: string;
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
    }));

  const [currentMenu, setCurrentMenu] = React.useState(null as MenuNode);
  const [iframeUrl, setIframeUrl] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(false);

  const handleMenuChange = (menu: MenuNode) => {
    const { uri } = menu;

    setCurrentMenu(menu);
    setIframeUrl(
      `${uri}?tenantId=${tenantId}&userId=${userId}&token=${token}&access_token=${token}`,
    );
  };

  const menuObj = JSON.parse(data?.data || '{}');

  const handleLogout = async () => {
    Modal.confirm({
      title: '您确定退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk: async () => {
        await logout();
        window.location.href = props.logoutPage;
      },
      onCancel: () => {},
    });
  };

  const handleCloseIframe = () => {
    setCurrentMenu(null);
    setIframeUrl('');
  };

  const generateMenu = (menus: Array<MenuNode>) => {
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
          onClick={() => handleMenuChange(item)}
        >
          {item.name}
        </AntMenu.Item>
      );
    });
  };

  return (
    <Layout className="qw-menu" style={{ minHeight: '100vh' }}>
      <Sider className="qw-menu-sider" width={256} trigger={null} collapsible collapsed={collapsed}>
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
            <Popover
              overlayClassName="qw-menu-popover"
              placement="bottom"
              content={(
                <ul className="qw-menu-system-wrap">
                  <li className="qw-menu-system-user-item">
                    <SettingOutlined />
                    <span>修改密码</span>
                  </li>
                  <li onClick={() => handleLogout()} className="qw-menu-system-user-item">
                    <LogoutOutlined />
                    <span>退出登录</span>
                  </li>
                </ul>
              )}
            >
              <span className="qw-menu-user">
                <UserOutlined className="qw-menu-user-icon" />
                {username}
              </span>
            </Popover>

            <Popover
              overlayClassName="qw-menu-popover"
              placement="bottom"
              content={(
                <ul className="qw-menu-system-wrap">
                  {formatSystemList(systemList).map((item) => (
                    <li key={item.code} className="qw-menu-system-item">
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            >
              <span className="qw-menu-top-hover">
                <RetweetOutlined />
              </span>
            </Popover>
          </div>
        </Header>
        <Content>
          <div className="qw-menu-crumbs">
            <Breadcrumb>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
              <Breadcrumb.Item>{currentMenu ? currentMenu.name : '首页'}</Breadcrumb.Item>
            </Breadcrumb>

            <CloseOutlined onClick={() => handleCloseIframe()} />
          </div>

          {iframeUrl ? (
            <Iframe url={iframeUrl} />
          ) : (
            <div className="qw-menu-empty-frame">
              <img src={require('./images/welcome.png')} alt="welcome" />
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
