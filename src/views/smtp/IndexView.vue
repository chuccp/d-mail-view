<template>
  <a-space  direction="vertical" class="space-alert"  v-if="!smtp_alert_hide" >
    <a-alert message="Here you can manage the SMTP server used for sending emails." type="info" @close="onCloseAlert" closable  show-icon />
  </a-space>
  <a-table size="middle"  :scroll="{ x: 500 }" :row-selection="{ type:'radio',selectedRowKeys: pageState.selectedRowKeys, onChange: onSelectChange }"
           :columns="columns"
           :pagination="pageState" @change="handleTableChange" :loading="pageState.loading"
           :row-key="(record:any) => record.id"
           :customRow="(record:any)=>{
             return {onClick: () => {
                    onSelectChange([record.id])
             }}
           }"
           :data-source="pageState.list" bordered>
    <template #bodyCell="{ column, text }">
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
import type {SMTP, Page, Pagination} from "@/interface/System";
import {fetchList, deleteSMTP} from "@/api/smtp";
import moment from "moment";
import {Modal} from "ant-design-vue";
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
import { useViewConfig } from '@/stores/system'

const viewConfig =useViewConfig()
const smtp_alert_hide = viewConfig.getConfig("smtp_alert_hide")

const  onCloseAlert = () => {
  viewConfig.setConfig("smtp_alert_hide", true)
}

const router = useRouter()
const clickAdd = () => {
  router.push("/smtp/add")
}
const clickEdit = () => {
  if (pageState.selectedRowKeys!.length > 0) {
    const id = pageState.selectedRowKeys![0]
    router.push("/smtp/edit/" + id)
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
    const data = pageState.list?.filter(v=>v.id==id);


    Modal.confirm({
      title: 'delete',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'delete mail:'+data![0].mail +"?",
      okText: 'ok',
      cancelText: 'cancel',
      onOk: () => {
        deleteSMTP(Number(id)).then(() => {
          queryPage()
        })
      }
    });
  } else {
    Modal.confirm({
      title: 'delete',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'Please select one',
      okText: 'ok',
      cancelText: 'cancel',
    });
  }
}

const pageState = reactive<Page<SMTP>>({
  selectedRowKeys: [],
  loading: false,
  total: 0,
  current: 1,
  pageSize: 5,
  list: new Array<SMTP>()
})

const queryPage = () => {
  pageState.loading = true
  fetchList(pageState.current!, pageState.pageSize!).then((page: Page<SMTP>) => {
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
    title: 'Host',
    dataIndex: 'host',
  },
  {
    title: 'port',
    dataIndex: 'port',
  },
  {
    title: 'username',
    dataIndex: 'username',
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
.space-alert{
  margin-bottom: 20px;
}
</style>
