import * as React from 'react';
import './index.less';
import { Layout, Menu as AntMenu, Popconfirm } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FolderOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { getUrlParam } from '../_utils/common';
import { getMenu } from '../_utils/service/auth';
import Iframe from './_utils/Iframe';
import welcomeImg from './images/welcome.png';

const { Header, Content, Sider } = Layout;
const { SubMenu } = AntMenu;

export interface MenuProps {
  systemName: string;
}

const Menu: React.FC<MenuProps> = (props) => {
  const title = decodeURI(getUrlParam('title'));
  const token = getUrlParam('token');
  const userId = getUrlParam('userId');
  const tenantId = getUrlParam('tenantId');
  const systemCode = getUrlParam('systemCode');
  const { systemName } = props;

  React.useEffect(() => {
    document.title = title ? decodeURI(title) : systemName;
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
        <div className="logo">{!collapsed ? title : ''}</div>
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
          <div className="qw-menu-header-right" />
          <div className="logout">
            <Popconfirm
              placement="bottomRight"
              title="确认退出登录吗?"
              onConfirm={handleLogout}
              okText="确定"
              cancelText="取消"
            >
              123
            </Popconfirm>
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
