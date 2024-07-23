<template>
  <a-page-header
      class="demo-page-header"
      :title="'view log'"
      @back="() => $router.go(-1)">
  </a-page-header>


  <a-descriptions title="log Info" bordered>
    <a-descriptions-item label="subject">{{ data.subject }}</a-descriptions-item>
    <a-descriptions-item label="content">{{ data.content }}</a-descriptions-item>
    <a-descriptions-item label="mail">{{ data.mail }}</a-descriptions-item>
    <a-descriptions-item label="stmp">{{ data.stmp }}</a-descriptions-item>
    <a-descriptions-item label="status">{{ data.statusStr }}</a-descriptions-item>
    <a-descriptions-item label="result">{{ data.result }}</a-descriptions-item>
    <a-descriptions-item label="createTime">
      {{ data.createTimeStr }}
    </a-descriptions-item>
    <a-descriptions-item label="files">

      <a-list size="small"  :data-source="data.fileArray">
        <template #renderItem="{ item }">
          <a-list-item>{{ item.name }}</a-list-item>
        </template>
      </a-list>

    </a-descriptions-item>
  </a-descriptions>

</template>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, onMounted, ref} from "vue";
import {getLog} from "@/api/log";
import type {Log} from "@/interface/System";
import moment from "moment";

const router = useRouter()
const route = useRoute()

// const data: string[] = [
//   'Racing car sprays burning fuel into crowd.',
//   'Japanese princess to wed commoner.',
//   'Australian walks 100km after outback crash.',
//   'Man charged over missing wedding girl.',
//   'Los Angeles battles huge wildfires.',
// ];

const data = ref<Log>({
  id: 0,
  name: "",
  mail: "",
  content: "",
  subject: "",
  stmp: "",
  statusStr: "",
  createTime: new Date(),
  updateTime: new Date(),
  files: "",
  fileArray: [],
  updateTimeStr: "",
  createTimeStr: "",
  status: 0,
  result: ""
})

onMounted(() => {

  if (route.params.id) {
    const id: string = route.params.id as string
    getLog(id).then((v) => {
      v.updateTimeStr = moment(v.updateTime).format('YYYY-MM-DD HH:mm:ss')
      v.createTimeStr = moment(v.createTime).format('YYYY-MM-DD HH:mm:ss')
      if (v.files){
        v.fileArray = JSON.parse(v.files)
      }
      data.value = v
    })
  }

})

</script>


<style scoped>

</style>