<template>
  <a-space  direction="vertical" class="space-alert"   >
    <a-alert message="Implement project monitoring by using scheduled tasks to read a specified API and send emails based on the information provided by the api." type="info" @close="onCloseAlert" closable  show-icon />
  </a-space>
  <a-table  size="middle" :scroll="{ x: 500 }" :row-selection="{ type:'radio',selectedRowKeys: pageState.selectedRowKeys, onChange: onSelectChange }"
           :columns="columns"
           :pagination="pageState" @change="handleTableChange" :loading="pageState.loading"
           :row-key="(record:any) => record.id"
           :customRow="(record:any)=>{
             return {onClick: () => {
                    onSelectChange([record.id])
             }}
           }"
           :data-source="pageState.list" bordered>
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <template #bodyCell="{column,text}">
    </template>
    <template #title>

      <div class="table-operations">
        <a-space>
          <a-button @click="clickAdd">add</a-button>
          <a-button @click="clickEdit">edit</a-button>
          <a-button @click="clickDelete">delete</a-button>
        </a-space>
      </div>

    </template>
    <template #footer></template>
  </a-table>
</template>
<script setup lang="ts">

import moment from 'moment/moment'
import { reactive } from 'vue'
import type { Mail, Page } from '@/interface/System'
import { useRouter } from 'vue-router'
const router = useRouter()
const pageState = reactive<Page<Mail>>({
  selectedRowKeys: [],
  loading: false,
  total: 0,
  current: 1,
  pageSize: 5,
  list: new Array<Mail>()
})

const columns = [
  {
    title: 'mail',
    className: 'mail',
    dataIndex: 'mail',
  },
  {
    title: 'name',
    dataIndex: 'name',
  }, {
    title: 'createTime',
    dataIndex: 'createTime',
    customRender: (text: any) => {
      return moment(text.value).format('YYYY-MM-DD HH:mm:ss')
    }
  }, {
    title: 'updateTime',
    dataIndex: 'updateTime',
    customRender: (text: any) => {
      return moment(text.value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
];
const onCloseAlert = () => {

}

const clickAdd = () => {
  router.push("/schedule/add")
}
const clickEdit = () => {

}
const clickDelete = () => {

}
const onSelectChange = (selectedRowKeys: any) => {

}
const handleTableChange = (pagination: any) => {

}

</script>


<style scoped>
.space-alert{
  margin-bottom: 20px;

}
</style>