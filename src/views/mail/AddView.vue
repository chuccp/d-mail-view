<template>

  <a-page-header
      class="demo-page-header"
      :title="$route.params.id?'edit Mail':'add Mail'"
      @back="() => $router.go(-1)"
  >

    <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="name" name="host">
        <a-input v-model:value="formState.name"/>
      </a-form-item>
      <a-form-item ref="name" label="mail" name="port">
        <a-input v-model:value="formState.mail"/>
      </a-form-item>
      <a-form-item label="operate">
        <a-button style="margin-left: 10px" @click="onSubmit">{{ id ? 'update' : 'save' }}</a-button>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import type {Mail} from "@/interface/System";
import {getMail, postMail, putMail} from "@/api/mail";
import {useRouter, useRoute} from "vue-router";

const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const formState = reactive<Mail>({})
onMounted(() => {
  if (route.params.id) {
    const id: string = route.params.id as string
    getMail(id).then((v) => {
      formState.id = Number(id)
      formState.mail = v.mail
      formState.name = v.name
    })
  }
})

const labelCol = {span: 5};
const wrapperCol = {span: 13};
const onSubmit = () => {

  if (route.params.id) {
    putMail(formState).then(() => {
      router.go(-1)
    })
  } else {
    postMail(formState).then(() => {
      router.go(-1)
    })
  }
}
</script>
<style scoped>

</style>