<template>

  <a-page-header
    class="demo-page-header"
    title="Send Mail"
    @back="() => $router.go(-1)"
  >

    <a-form
      ref="formRef"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >

      <a-form-item ref="name" label="SMTP" name="SMTP">
        <a-input v-model:value="formState.SMTP" disabled />
      </a-form-item>

      <a-form-item ref="name" label="Recipients" name="Recipients">

        <a-select v-model:value="formState.recipients" mode="tags" style="width: 100%" placeholder="email address"
                  :options="options"></a-select>


      </a-form-item>

      <a-form-item ref="name" label="subject" name="subject">
        <a-input v-model:value="formState.subject" />
      </a-form-item>


      <a-form-item ref="name" label="content" name="content">
        <a-textarea v-model:value="formState.content" placeholder="content" :rows="4" />
      </a-form-item>

      <a-form-item label="operate">
        <a-button style="margin-left: 10px" @click="onSubmit">Send Mail</a-button>
      </a-form-item>

    </a-form>

  </a-page-header>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { SendMail } from '@/interface/System'

const formState = reactive<SendMail>({ content: '', recipients: [], subject: '', token: '', SMTP: '' })
const labelCol = { span: 5 }
const wrapperCol = { span: 13 }
const options = Array()

const onSubmit = () => {

}

</script>


<style scoped>

</style>