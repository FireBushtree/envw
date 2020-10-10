import axios, { Method, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getUrlParam } from '../common';
import { getAccessTokenFromStorage } from '../auth';

export interface Response<T> {
  data: T;
  exception: string;
  msg: string;
  result: number;
  timestamp: string;
  headers: any;
}

interface Option {
  params?: any;
}

function request<T>(url: string, type: Method, data?: any, option?: Option) {
  return new Promise<Response<T>>((resolve, reject) => {
    const token = getUrlParam('token') || getAccessTokenFromStorage();

    const requestOption = {
      url,
      data,
      method: type,
      params: option?.params || {},
      withCredentials: true,
      headers: {
        Authorization: token,
        access_token: token,
      },
    } as AxiosRequestConfig;

    if (type.toUpperCase() === 'GET') {
      requestOption.params = data;
    }

    axios
      .request<Response<T>>(requestOption)
      .then((res: AxiosResponse) => {
        let { data: resData } = res;
        const { headers } = res;

        resData = typeof resData === 'string' ? { resData, result: 0 } : resData;

        // 将响应头塞进返回结果
        resData.headers = headers;

        if (resData.result === 0) {
          resolve(resData);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => reject(err));
  });
}

function get<T>(url: string, data?: any, option?: Option) {
  return request<T>(url, 'GET', data, option);
}
function post<T>(url: string, data?: any, option?: Option) {
  return request<T>(url, 'POST', data, option);
}
function del<T>(url: string, data?: any, option?: Option) {
  return request<T>(url, 'DELETE', data, option);
}
function put<T>(url: string, data?: any, option?: Option) {
  return request<T>(url, 'PUT', data, option);
}

export { get, post, del, put };
