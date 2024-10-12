import axios from 'axios'
import { message } from 'ant-design-vue'
import { getLogin } from '@/util/localStore'
import { useSystem } from '@/stores/system'

const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
export const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    const system = useSystem()
    return 'http://127.0.0.1:' + system.system.port
  }
  return ''
}
service.interceptors.request.use(config => {
  config.headers['Nonce'] = getLogin()
  config.baseURL = getBaseUrl()
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  return response
}, (error) => {
  message.error(error.response.data)
  return Promise.reject(error)
})

export default service