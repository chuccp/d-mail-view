import { defineStore } from 'pinia'
import type { System } from '@/interface/System'
import { ref } from 'vue'

export const useSystem = defineStore('useSystem', () => {
  const system = ref<System>({
    hasInit: false,
    hasLogin: false,
    isInit: false,
    isDocker: false,
    port: import.meta.env.VITE_BASE_PORT
  })
  return { system }
})

export const useViewConfig = defineStore('useViewConfig', () => {
  const config = ref<Map<string, boolean>>()
  const getConfig = (key: string) => {
    if (!config.value) {
      const _config = localStorage.getItem('_viewConfig_')
      if (_config) {
        config.value = new Map<string, boolean>(JSON.parse(_config))
      }
    }
    if (config.value && config.value.has(key)) {
      return config.value.get(key)
    }
    return false
  }
  const setConfig = (key: string, value: boolean) => {
    if (!config.value) {
      config.value = new Map<string, boolean>()
    }
    config.value.set(key, value)
    localStorage.setItem('_viewConfig_', JSON.stringify(Array.from(config.value)))
  }
  return { config, getConfig, setConfig }
})
