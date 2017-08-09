import axios from 'axios';

let base = '';
//发起ajax请求登录提交请求
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data).catch(); };
//发起ajax请求获取列表
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
//发起ajax请求获取页面
export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
//发起ajax请求移除列表选项
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
//发起ajax请求分批删除
export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
//发起ajax请求编辑内容
export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
//发起ajax请求添加内容
export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };