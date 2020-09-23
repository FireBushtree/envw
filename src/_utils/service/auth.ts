import { post, get } from '../request';

interface LoginReq {
  username: string;
  password: string;
}

export interface LoginRes {
  departmentId: string;
  departmentName: string;
  email: string;
  imToken: string;
  latitude: null;
  latitudeDone: null;
  loginPage: null;
  loginType: string;
  longitude: null;
  longitudeDone: null;
  mapDefJson: string;
  name: string;
  navigationPage: null;
  orgId: string;
  orgName: null;
  partyPostName: null;
  period: null;
  periodCount: null;
  phone: string;
  photoId: string;
  postName: null;
  rongLianAccount: null;
  staffId: string;
  systemList: string;
  tenantId: string;
  themeBackground: null;
  themeStyle: string;
  userCode: string;
  userId: string;
  userName: string;
  whiteList: null;
}
/**
 * 登录接口
 * @param data
 */
export const login = (data: LoginReq, params?: { tenantId: string }) =>
  post<LoginRes>('/cas/login', data, { params });

export const syncToken = (access_token: string) =>
  get('/cloud/zszy/prd/api/user/syncToken', { access_token });

export interface GetMenuReq {
  userId: string;
  tenantId: string;
  systemCode: string;
}

export const getMenu = (data: GetMenuReq) =>
  get<string>('/cloud/management/util/getMenuJson.sa', data);

/**
 * 退出登录
 */
export const logout = () =>
  post('/cas/logout');
