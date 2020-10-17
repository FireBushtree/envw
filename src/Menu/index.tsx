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
import { useMount, useRequest } from 'ahooks';
import { getUrlParam } from '../_utils/common';
import { getMenu, getUser, logout } from '../_utils/service/auth';
import Iframe from './_utils/Iframe';

const { Header, Content, Sider } = Layout;
const { SubMenu } = AntMenu;

export interface MenuProps {
  logoutPage: string;
  showSystemList?: boolean;
  staticMenu?: Array<MenuNode>;
  systemName?: string;
  logo?: React.ReactElement;
  className?: string;
  onSystemChange?: (system: System) => any;
  onMenuChange?: (menu: MenuNode, setIframeUrl: Function) => any;
  clickChangePassword?: (setIframeUrl: Function) => any;
  formatMenu?: (menu: MenuNode) => Array<MenuNode>;
  useDefaultIcon?: boolean;
}

export interface MenuNode {
  children?: null | Array<MenuNode>;
  code?: string;
  description?: string;
  functionId?: null;
  iconFont?: string;
  id?: string;
  isControlled?: number;
  isLeaf?: number;
  isWelcomeMenu?: number;
  level?: number;
  name: string;
  orderIndex?: number;
  parentId?: string;
  photoIds?: string;
  uri?: string;
  icon?: React.ReactElement | string;
}

interface System {
  name: string;
  code: string;
}

const formatSystemList = (systemStr: string) => {
  if (!systemStr) {
    return [];
  }

  const system: Array<string> = JSON.parse(systemStr);
  const systemList = [] as Array<System>;

  system.forEach((item) => {
    const [code, name] = item.split('||');
    systemList.push({ name, code });
  });

  return systemList;
};

const getFirstLeaf = (menu: Array<MenuNode> | null, link = [] as Array<MenuNode>) => {
  if (!menu) {
    return link;
  }

  const target = menu.find((item) => !item.children);

  if (target) {
    link.push(target);
    return;
  }

  const [firstNode] = menu;
  link.push(firstNode);
  return getFirstLeaf(firstNode.children, link);
};

const Menu: React.FC<MenuProps> = (props) => {
  // 防止title为`undefined`转义为字符， 所以做空字符串处理
  const tab = getUrlParam('tab');
  const title = decodeURI(getUrlParam('title') || '');
  const token = getUrlParam('token');
  const userId = getUrlParam('userId');
  const tenantId = getUrlParam('tenantId');
  const systemCode = getUrlParam('systemCode');
  const {
    systemName,
    logo,
    className,
    showSystemList,
    clickChangePassword,
    formatMenu,
    useDefaultIcon,
    staticMenu,
  } = props;
  const { data: user } = useRequest(getUser);
  const { name: username = '', systemList = '' } = user?.data || {};

  React.useEffect(() => {
    document.title = title || systemName;
  });

  const { data, run: runGetMenu } = useRequest(
    () =>
      getMenu({
        userId,
        tenantId,
        systemCode,
      }),
    {
      manual: true,
    },
  );

  useMount(() => {
    // 设置静态菜单
    if (props.staticMenu && Array.isArray(props.staticMenu)) {
      return;
    }

    runGetMenu();
  });

  const [currentMenu, setCurrentMenu] = React.useState(null as MenuNode);
  const [iframeUrl, setIframeUrl] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(false);

  const handleMenuChange = (menu: MenuNode) => {
    setCurrentMenu(menu);

    const { uri } = menu;
    const { onMenuChange } = props;

    if (onMenuChange) {
      onMenuChange(menu, setIframeUrl);
      return;
    }

    const redirectIframeUrl = `${uri}?tenantId=${tenantId}&userId=${userId}&token=${token}&access_token=${token}`;
    setIframeUrl(redirectIframeUrl);
  };

  const handleSystemChange = (system: System) => {
    const { onSystemChange } = props;

    if (onSystemChange) {
      onSystemChange(system);
    }
  };

  let menuObj = Array.isArray(staticMenu)
    ? { children: staticMenu }
    : JSON.parse(data?.data || '{}');

  if (formatMenu) {
    menuObj = formatMenu(menuObj);
  }

  const [defaultSelectKeys, setDefaultSelectKeys] = React.useState([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = React.useState([]);

  React.useEffect(() => {
    if (menuObj.children && tab) {
      const { children }: { children: Array<MenuNode> } = menuObj;
      const target = children.find((item) => item.id === tab);

      if (target) {
        const link = [target];
        getFirstLeaf(target.children, link);

        const selected = link.pop();
        setDefaultOpenKeys(link.map((item) => item.id));
        setDefaultSelectKeys([selected.id]);
        handleMenuChange(selected);
      } else {
        setDefaultOpenKeys([1]);
        setDefaultSelectKeys([1]);
      }
    }
  }, [data]);

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
          <SubMenu
            icon={item.icon || (useDefaultIcon ? <FolderOutlined /> : null)}
            key={item.id}
            title={item.name}
          >
            {generateMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <AntMenu.Item
          icon={item.icon || (useDefaultIcon ? <FileTextOutlined /> : null)}
          key={item.id}
          onClick={() => handleMenuChange(item)}
        >
          {item.name}
        </AntMenu.Item>
      );
    });
  };

  const generateCollapsedTitle = () => {
    if (logo && systemName) {
      return logo;
    }

    return null;
  };

  const generateMenuRoot = () => {
    // 当有tab时， 需要默认选中第一个叶子节点
    // 但是数据从远程获取后， defaultOpenKeys失效
    // 所以当有tab时等待 请求结果返回再渲染节点

    const MenuEl = (
      <AntMenu
        theme="dark"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectKeys}
        mode="inline"
      >
        {generateMenu(menuObj?.children || [])}
      </AntMenu>
    );

    if (tab && !staticMenu && defaultSelectKeys.length === 0) {
      return null;
    }

    return MenuEl;
  };

  return (
    <Layout className={`qw-menu ${className}`} style={{ minHeight: '100vh' }}>
      <Sider className="qw-menu-sider" width={256} trigger={null} collapsible collapsed={collapsed}>
        <div className="qw-menu-title">
          {collapsed ? (
            generateCollapsedTitle()
          ) : (
            <>
              {logo}
              {systemName && <span className="qw-menu-logo">{title || systemName}</span>}
            </>
          )}
        </div>
        {generateMenuRoot()}
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
                  <li
                    onClick={() => {
                      if (clickChangePassword) {
                        clickChangePassword(setIframeUrl);
                      }
                    }}
                    className="qw-menu-system-user-item"
                  >
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

            {showSystemList && (
              <Popover
                overlayClassName="qw-menu-popover"
                placement="bottom"
                content={(
                  <ul className="qw-menu-system-wrap">
                    {formatSystemList(systemList).map((item) => (
                      <li
                        onClick={() => handleSystemChange(item)}
                        key={item.code}
                        className="qw-menu-system-item"
                      >
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
            )}
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

Menu.defaultProps = {
  showSystemList: true,
  useDefaultIcon: true,
};

export default Menu;
