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
          <a-button @click="clickAdd">添加</a-button>
          <a-button @click="clickEdit">修改</a-button>
          <a-button @click="clickDelete">删除</a-button>
        </a-space>
      </div>

    </template>
    <template #footer></template>
  </a-table>
</template>
<script lang="ts" setup>
import {RouterView, useRouter} from "vue-router";
import {computed, createVNode, onMounted, reactive} from "vue";
import type {Token, Page, Pagination} from "@/interface/System";
import {fetchList, deleteToken} from "@/api/token";
import moment from "moment";
import {Modal} from "ant-design-vue";
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';

const router = useRouter()
const clickAdd = () => {
  router.push("/token/add")
}
const clickEdit = () => {
  if (pageState.selectedRowKeys!.length > 0) {
    const id = pageState.selectedRowKeys![0]
    router.push("/token/edit/" + id)
  } else {
    Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '请选择一个',
      okText: '确认',
      cancelText: '取消',
    });
  }
}

const clickDelete = () => {
  if (pageState.selectedRowKeys!.length > 0) {
    const id = pageState.selectedRowKeys![0]

    Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '确定删除吗',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteToken(Number(id)).then(() => {
          queryPage()
        })
      }
    });


  } else {
    Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: '请选择一个',
      okText: '确认',
      cancelText: '取消',
    });
  }
}

const pageState = reactive<Page<Token>>({
  selectedRowKeys: [],
  loading: false,
  total: 0,
  current: 1,
  pageSize: 5,
  list: new Array<Token>()
})

const queryPage = () => {
  pageState.loading = true
  fetchList(pageState.current!, pageState.pageSize!).then((page: Page<Token>) => {
    pageState.total = <number>page.total
    pageState.list = page.list
    pageState.loading = false
  }).catch(() => {
    pageState.loading = false
  })
}


onMounted(() => {
  queryPage()
})

const onSelectChange = (v: any) => {
  pageState.selectedRowKeys = v
}
const handleTableChange = (data: Pagination) => {
  pageState.total = data.total
  pageState.current = data.current
  pageState.pageSize = data.pageSize
  queryPage()
}
const columns = [
  {
    title: 'token',
    className: 'token',
    dataIndex: 'token',
  },{
    title: 'subject',
    dataIndex: 'subject',
  },
  {
    title: 'receiveEmails',
    dataIndex: 'receiveEmailsStr',
  },
  {
    title: 'STMP',
    dataIndex: 'STMPStr',
  },
  {
    title: 'isUse',
    dataIndex: 'isUse',
    customRender:(isUse:any)=>{
      return isUse.value?"yes":"no"
    }
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
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
