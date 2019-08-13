/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post, Delete, put } from './tools';
import * as config from './config';

export const getBbcNews = () => get({ url: config.NEWS_BBC });

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

export const gitOauthLogin = () => get({ url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin` });
export const gitOauthToken = code => post({
    url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
    data: {
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
        redirect_uri: 'http://localhost:3006/',
        state: 'reactAdmin',
        code,
    }
});
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = access_token => get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = (data) => post({
    url: config.USER_LOGIN,
    data,
    headers: {
        'Content-Type': 'application/json',
    }
});
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });

export const getAllUsers = () => get({
    url: config.ALL_USERS + '?current=1&size=100',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getUserProfile = () => get({
    url: config.USER_PROFILE,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const uploadFiles = (file) => post ({
    url: config.UPLOAD,
    data: file,
    headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getCpMatching = () => get({
    url: config.CP_TEAM,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getAllProjects = () => get({
    url: config.PROJECTS + '?current=1&size=20',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const createProjects = (data) => post({
    url: config.PROJECTS,
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const deleteProjects = (id) => Delete ({
    url: config.PROJECTS + '/' + id,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const editProjects = (data) => put({
    url: config.PROJECTS,
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getAllProjectTasks = (id) => get({
    url: config.PROJECT_TASK + '/' + id,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const deleteProjectTask = (id) => Delete ({
    url: config.PROJECT_TASK + '/' + id,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const createProjectTask = (data) => post({
    url: config.PROJECT_TASK,
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getStudyPath = () => get({
    url: config.STUDY_PATH,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const deleteStudyPath = (id) => Delete ({
    url: config.STUDY_PATH + '/' + id,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const createStudyPath = (data) => post({
    url: config.STUDY_PATH,
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getStudyPathTasks = (id) => get({
    url: config.STUDY_PATH_DETAILS + '/' + id,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const deleteStudyPathTask = (id) => Delete ({
    url: config.STUDY_PATH_DETAILS + '/' + id,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const createStudyPathTask = (data) => post({
    url: config.STUDY_PATH_DETAILS,
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const getAllSchedule = () => get({
    url: config.SCHEDULE + '/',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const deleteSchedule = (id) => Delete ({
    url: config.SCHEDULE + '/' + id,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export const createSchedule = (data) => post({
    url: config.SCHEDULE,
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});
