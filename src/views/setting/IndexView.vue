<template>
  <a-space direction="vertical" class="space-alert" v-if="!set_alert_hide">
    <a-alert
      message="Reconfigure the management account password and port number."
      type="info"
      @close="onCloseAlert"
      closable
      show-icon
    />
  </a-space>
  <a-page-header class="demo-page-header" title="SETTING" @back="() => $router.go(-1)">
    <a-card :bordered="false" title="Admin Account" :style="{ marginTop: '10px' }">
      <a-form :model="formState" layout="vertical">
        <a-form-item label="username">
          <a-input placeholder="username" v-model:value="formState.manage!.username" />
        </a-form-item>
        <a-form-item
          label="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.manage!.password"
            name="password"
            placeholder="password"
          />
        </a-form-item>
      </a-form>
    </a-card>

    <a-card :bordered="false" title="http port" :style="{ marginTop: '10px' }">
      <a-form :model="formState" layout="vertical">
        <a-form-item label="api port">
          <a-input-number :disabled = "formState.isDocker"
            v-model:value="formState.api!.port"
            name="api port"
            style="width: 100%"
            placeholder="api port"
            :min="1"
            :max="65535"
          />
        </a-form-item>
        <a-form-item label="manage port">
          <a-input-number :disabled = "formState.isDocker"
            v-model:value="formState.manage!.port"
            name="manage port"
            style="width: 100%"
            placeholder="manage port"
            :min="1"
            :max="65535"
          />
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false">
      <a-form :model="formState" @finish="handleFinish(formState)" :style="{ marginTop: '20px' }">
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" style="margin-left: 10px"
            >save and restart</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </a-page-header>
</template>

<script setup lang="ts">
import { getDefaultSet, putReSet, readSet, reStart } from '@/api/set'
import { onMounted, reactive } from 'vue'
import type { SetInfo } from '@/interface/System'
import { useRouter } from 'vue-router'
import { useSystem, useViewConfig } from '@/stores/system'

const viewConfig = useViewConfig()
const set_alert_hide = viewConfig.getConfig('set_alert_hide')

const onCloseAlert = () => {
  viewConfig.setConfig('set_alert_hide', true)
}

const router = useRouter()
const formState = reactive<SetInfo>({
  dbType: 'sqlite',
  sqlite: { filename: '' },
  mysql: { host: '', port: 3306, dbname: '', username: '', password: '', charset: '' },
  reset: false,
  manage: { port: 0, webPath: '', username: '', password: '', confirmPassword: '' },
  api: { port: 0 },
  isDocker: false
})
const handleFinish = (values: SetInfo) => {
  putReSet(values).then((v) => {
    reStart()
      .then((v) => {
        location(values.manage!.port!)
      })
      .catch((v) => {
        location(values.manage!.port!)
      })
  })
}
const location = (port: number | string | Number) => {
  if (import.meta.env.DEV) {
    const system = useSystem()
    system.system.port = parseInt(String(port))
    router.push('/signIn')
  } else {
    const url = new URL(document.location.origin)
    url.port = String(port)
    window.location.href = url.origin
  }
}
onMounted(() => {
  readSet().then((si: SetInfo) => {
    formState.dbType = si.dbType
    formState.sqlite = si.sqlite
    formState.mysql = si.mysql
    formState.manage = si.manage
    formState.api = si.api
    formState.isDocker = si.isDocker
  })
})
</script>

<style scoped></style>
