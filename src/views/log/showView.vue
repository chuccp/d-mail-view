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
    <a-descriptions-item label="SMTP">{{ data.smtp }}</a-descriptions-item>
    <a-descriptions-item label="status">{{ data.statusStr }}</a-descriptions-item>
    <a-descriptions-item label="result">{{ data.result }}</a-descriptions-item>
    <a-descriptions-item label="createTime">
      {{ data.createTimeStr }}
    </a-descriptions-item>
    <a-descriptions-item label="files">

      <a-list size="small" :data-source="data.fileArray">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-button type="link" @click="download(item)"> {{ item.name }}</a-button>
          </a-list-item>
        </template>
      </a-list>

    </a-descriptions-item>
  </a-descriptions>

</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, onMounted, ref } from 'vue'
import { getLog } from '@/api/log'
import type { File, Log } from '@/interface/System'
import moment from 'moment'
import { getBaseUrl } from '@/util/request'

const router = useRouter()
const route = useRoute()

const download = (item: File) => {
  const baseurl = getBaseUrl()
  window.open(baseurl + '/download?file=' + item.filePath, '_blank')
}

const data = ref<Log>({
  id: 0,
  name: '',
  mail: '',
  content: '',
  subject: '',
  smtp: '',
  statusStr: '',
  createTime: new Date(),
  updateTime: new Date(),
  files: '',
  fileArray: [],
  updateTimeStr: '',
  createTimeStr: '',
  status: 0,
  result: ''
})

onMounted(() => {

  if (route.params.id) {
    const id: string = route.params.id as string
    getLog(id).then((v) => {
      v.updateTimeStr = moment(v.updateTime).format('YYYY-MM-DD HH:mm:ss')
      v.createTimeStr = moment(v.createTime).format('YYYY-MM-DD HH:mm:ss')
      if (v.files) {
        v.fileArray = JSON.parse(v.files)
      }
      data.value = v
    })
  }

})

</script>


<style scoped>

</style>