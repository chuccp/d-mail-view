<template>
  <a-table size="middle" :scroll="{ x: 500 }" :row-selection="{ type:'radio',selectedRowKeys: pageState.selectedRowKeys, onChange: onSelectChange }"
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
          <a-button @click="clickAdd">add</a-button>
          <a-button @click="clickEdit">edit</a-button>
          <a-button @click="clickDelete">delete</a-button>
        </a-space>
      </div>

    </template>
    <template #footer></template>
  </a-table>
</template>
<script lang="ts" setup>
import {RouterView, useRouter} from "vue-router";
import {computed, createVNode, onMounted, reactive} from "vue";
import type {Mail, Page, Pagination} from "@/interface/System";
import {fetchList, deleteMail} from "@/api/mail";
import moment from "moment";
import {Modal} from "ant-design-vue";
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';


const router = useRouter()
const clickAdd = () => {
  router.push("/mail/add")
}
const clickEdit = () => {
  if (pageState.selectedRowKeys!.length > 0) {
    const id = pageState.selectedRowKeys![0]
    router.push("/mail/edit/" + id)
  } else {
    Modal.confirm({
      title: 'edit',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'please select one',
      okText: 'ok',
      cancelText: 'cancel',
    });
  }
}

const clickDelete = () => {
  if (pageState.selectedRowKeys!.length > 0) {
    const id = pageState.selectedRowKeys![0]

    Modal.confirm({
      title: 'delete',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'delete?',
      okText: 'ok',
      cancelText: 'cancel',
      onOk: () => {
        deleteMail(Number(id)).then(() => {
          queryPage()
        })
      }
    });
  } else {
    Modal.confirm({
      title: 'delete',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'please select one',
      okText: 'ok',
      cancelText: 'cancel',
    });
  }
}

const pageState = reactive<Page<Mail>>({
  selectedRowKeys: [],
  loading: false,
  total: 0,
  current: 1,
  pageSize: 5,
  list: new Array<Mail>()
})

const queryPage = () => {
  pageState.loading = true
  fetchList(pageState.current!, pageState.pageSize!).then((page: Page<Mail>) => {
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
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
