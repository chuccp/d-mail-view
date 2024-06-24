

<template>
  <a-table :row-selection="{ type:'radio',selectedRowKeys: pageState.selectedRowKeys, onChange: onSelectChange }"
           :columns="columns"
           :pagination="pageState" @change="handleTableChange" :loading="pageState.loading"
           :row-key="(record:any) => record.id"
           :data-source="pageState.list" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
    <template #footer></template>
  </a-table>
</template>
<script setup lang="ts">

import type {Log, Page,Pagination} from "@/interface/System";
import moment from "moment/moment";
import {reactive} from "vue";
import {fetchList} from "@/api/log";



const pageState = reactive<Page<Log>>({
  selectedRowKeys: [],
  loading: false,
  total: 0,
  current: 1,
  pageSize: 5,
  list: new Array<Log>()
})
const queryPage = () => {
  pageState.loading = true
  fetchList(pageState.current!, pageState.pageSize!).then((page: Page<Log>) => {
    pageState.total = <number>page.total
    pageState.list = page.list
    pageState.loading = false
  }).catch(() => {
    pageState.loading = false
  })
}

const handleTableChange = (data: Pagination) => {
  pageState.total = data.total
  pageState.current = data.current
  pageState.pageSize = data.pageSize
  queryPage()
}

const onSelectChange=(v: any)=>{
  pageState.selectedRowKeys = v
}

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

</script>
<style scoped>

</style>