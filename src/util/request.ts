import axios from 'axios'
import {message} from "ant-design-vue";
import {getLogin} from "@/util/localStore";

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_HOST + import.meta.env.VITE_BASE_PATH,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
export const getBaseUrl=()=>{
    return import.meta.env.VITE_BASE_HOST + import.meta.env.VITE_BASE_PATH;
}
service.interceptors.request.use(config => {
    config.headers["Nonce"] = getLogin()
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