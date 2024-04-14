import axios from "axios";
import { getBasicAuth } from "./AuthApiService";

const API_BASE_URL = axios.create({
    
    baseURL: 'http://localhost:8080/api/v1/tasks'

  })
axios.interceptors.request.use(config => {
    config.headers['Authorization'] = getBasicAuth();
    return config;
}, error => {
    return Promise.reject(error);
});

 export const retrieveAllTasks = () => API_BASE_URL.get('/getall');
// export const registerApi = (user) => authApiClient.post('/register', user)
export const retrieveAllTasksforsort = () => API_BASE_URL.get('/sortedByDueDate');
export const retrieveAllTasksforsortdesc= () => API_BASE_URL.get('/sortedByDueDateDesc');
export const createTask = (task) => API_BASE_URL.post('/addnewtask',task)

export const retrieveTaskById = (taskId) => axios.get(API_BASE_URL + '/' + taskId)

export const getTaskById = (taskId) => API_BASE_URL.get('/getTaskbyid/' + taskId)
export const updateTask = (task, id) => API_BASE_URL.put('/' + id, task)

export const deleteTask = (id) => API_BASE_URL.delete('/' + id)

export const markDone = (id) => API_BASE_URL.patch('/' + id + '/task-done')

export const markPending = (id) => axios.patch(API_BASE_URL + '/' + id + '/task-pending')