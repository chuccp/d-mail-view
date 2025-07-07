<template>

  <a-page-header
      class="demo-page-header"
      :title="$route.params.id?'edit SMTP':'add SMTP'"
      @back="() => $router.go(-1)"
  >

    <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="host" name="host">
        <a-input v-model:value="formState.host"/>
      </a-form-item>
      <a-form-item ref="name" label="port" name="port">
        <a-input v-model:value="formState.port"/>
      </a-form-item>
      <a-form-item ref="name" label="username" name="username">
        <a-input v-model:value="formState.username"/>
      </a-form-item>
      <a-form-item ref="name" label="mail" name="mail">
        <a-input v-model:value="formState.mail"/>
      </a-form-item>
      <a-form-item ref="name" label="password" name="password">
        <a-input-password v-model:value="formState.password"/>
      </a-form-item>

      <a-form-item label="operate">
        <a-button danger @click="onTest">test</a-button>
        <a-button style="margin-left: 10px" @click="onSubmit">{{ id ? 'update' : 'save' }}</a-button>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import type {SMTP} from "@/interface/System";
import {getSMTP, postSMTP, putSMTP, testSMTP} from "@/api/smtp";
import {useRouter, useRoute} from "vue-router";
import {message} from "ant-design-vue";

const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const formState = reactive<SMTP>({host: "", port: 25, mail: "", username: "", password: ""})
onMounted(() => {
  if (route.params.id) {
    const id: string = route.params.id as string
    getSMTP(id).then((v) => {
      formState.id = Number(id)
      formState.host = v.host
      formState.port = v.port
      formState.mail = v.mail
      formState.password = v.password
      formState.username = v.username
      console.log(formState)
    })
  }
})


const labelCol = {span: 5};
const wrapperCol = {span: 13};


const onSubmit = () => {
  formState.port = Number(formState.port)
  if (route.params.id) {
    putSMTP(formState).then(() => {
      router.go(-1)
    })
  } else {
    postSMTP(formState).then(() => {
      router.go(-1)
    })
  }


}
const onTest = () => {
  formState.port = Number(formState.port)
  testSMTP(formState).then((v) => {
    message.success(v);
  })

}

</script>
<style scoped>

</style>