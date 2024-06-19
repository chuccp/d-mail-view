import axios from 'axios'
import {message} from "ant-design-vue";

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_HOST + import.meta.env.VITE_BASE_PATH,
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use((response) => {
    return response
}, (error) => {
    message.error(error.response.data);
    return Promise.reject(error);
})

export default service