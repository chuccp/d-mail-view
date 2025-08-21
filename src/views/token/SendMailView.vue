<template>
  <a-page-header class="demo-page-header" title="Send Mail" @back="() => $router.go(-1)">
    <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

      <a-form-item ref="name" label="token" name="token">
        <a-input v-model:value="formState.token" disabled />
      </a-form-item>

      <a-form-item ref="name" label="SMTP" name="SMTP">
        <a-input v-model:value="formState.SMTP" disabled />
      </a-form-item>



      <a-form-item ref="name" label="Recipients" name="Recipients">
        <a-select
          v-model:value="formState.recipients"
          mode="tags"
          style="width: 100%"
          placeholder="email address"
          :options="options"
        ></a-select>
      </a-form-item>

      <a-form-item ref="name" label="Subject" name="subject">
        <a-input v-model:value="formState.subject" />
      </a-form-item>

      <a-form-item ref="name" label="Content" name="content">
        <a-textarea v-model:value="formState.content" placeholder="content" :rows="4" />
      </a-form-item>

      <a-form-item label="Operate">
        <a-button style="margin-left: 10px" @click="onSubmit">Send Mail</a-button>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { SendMail } from '@/interface/System'
import { getToken, sendMailByToken } from '@/api/token'
import { randomHex } from '@/util/string'
import { useRoute } from 'vue-router'
import { Modal } from 'ant-design-vue'

const formState = reactive<SendMail>({
  token: '',
  SMTPId: '',
  content: '',
  recipients: [],
  subject: ''
})
const labelCol = { span: 5 }
const wrapperCol = { span: 13 }
const options = Array()
const route = useRoute()
const onSubmit = () => {
  sendMailByToken(formState).then((v) => {
    Modal.info({ title: 'success' })
  })
}
onMounted(() => {
  if (route.params.id) {
    const id: string = route.params.id as string
    getToken(id).then((v) => {
      formState.SMTPId = v.SMTPId
      formState.recipients = v.receiveEmails!.map((v) => v.mail!)
      formState.subject = v.subject
      formState.SMTP = v.SMTPStr
      formState.token = v.token
    })
  }
})
</script>

<style scoped></style>
