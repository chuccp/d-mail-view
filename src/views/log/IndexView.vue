

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

    <template #title>

      <div class="table-operations">
        <a-space>
          <a-button >查看</a-button>
        </a-space>
      </div>

    </template>

    <template #footer></template>
  </a-table>
</template>
<script setup lang="ts">

import type {Log, Page,Pagination} from "@/interface/System";
import moment from "moment/moment";
import {reactive,onMounted} from "vue";
import {fetchList} from "@/api/log";




const pageState = reactive<Page<Log>>({
  selectedRowKeys: [],
  loading: false,
  total: 0,
  current: 1,
  pageSize: 5,
  list: new Array<Log>()
})

onMounted(() => {
  queryPage()
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
    title: 'token',
    className: 'token',
    dataIndex: 'token',
  },
  {
    title: 'subject',
    dataIndex: 'subject',
  },  {
    title: 'status',
    className: 'statusStr',
    dataIndex: 'statusStr',
  },{
    title: 'result',
    dataIndex: 'result',
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