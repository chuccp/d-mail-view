<template>
  <a-page-header
    class="demo-page-header"
    title="SETTING"
    @back="() => $router.go(-1)"
  >

    <a-card :bordered="false" title="Admin Account" :style="{marginTop:'10px'}">
      <a-form :model="formState" layout="vertical">
        <a-form-item label="username">
          <a-input placeholder="username"  v-model:value="formState.manage!.username" />
        </a-form-item>
        <a-form-item label="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password  v-model:value="formState.manage!.password" name="password" placeholder="password" />
        </a-form-item>
      </a-form>
    </a-card>


    <a-card :bordered="false" title="http port" :style="{marginTop:'10px'}">
      <a-form :model="formState" layout="vertical">
        <a-form-item label="api port">
          <a-input v-model:value="formState.api!.port" name="api port" placeholder="api port" />
        </a-form-item>
        <a-form-item label="manage port">
          <a-input v-model:value="formState.manage!.port" name="manage port" placeholder="manage port" />
        </a-form-item>
      </a-form>
    </a-card>

    <a-card :bordered="false">

      <a-form :model="formState" @finish="handleFinish(formState)" :style="{marginTop:'20px'}">

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" style="margin-left: 10px">save and restart</a-button>
        </a-form-item>

      </a-form>


    </a-card>

  </a-page-header>
</template>

<script setup lang="ts">
import { getDefaultSet, putReSet, readSet } from '@/api/set'
import { onMounted, reactive } from 'vue'
import type { SetInfo } from '@/interface/System'
import { useRouter } from 'vue-router'
const router = useRouter()
const formState = reactive<SetInfo>(
  {
    dbType: 'sqlite',
    sqlite: { filename: '' },
    mysql: { host: '', port: 3306, dbname: '', username: '', password: '', charset: '' },
    reset: false,
    manage: { port: 0, webPath: '', username: '', password: '', confirmPassword: '' },
    api: { port: 0 }
  }
)
const handleFinish = (values: SetInfo) => {
  putReSet(values).then((v) => {
    router.push("/signIn")
  })
}

onMounted(() => {
  readSet().then((si: SetInfo) => {
    formState.dbType = si.dbType
    formState.sqlite = si.sqlite
    formState.mysql = si.mysql
    formState.manage = si.manage
    formState.api = si.api
  })
})


</script>

<style scoped>

</style>