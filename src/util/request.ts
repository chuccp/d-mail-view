import axios from 'axios'
import { Modal } from 'ant-design-vue'
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

export const getApiUrl = (url: string) => {
  return getBaseUrl() + url
}

service.interceptors.request.use(
  (config) => {
    config.headers['Nonce'] = getLogin()
    config.baseURL = getBaseUrl()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const ModalError = (error: string) => {
  Modal.error({
    title: 'error',
    content: error,
    onOk() {
      if (error.includes('timeout')) {
        window.location.reload()
      }
    }
  })
}
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      ModalError(error.response.data)
    } else {
      ModalError(error.message)
    }

    return Promise.reject(error)
  }
)

export default service
