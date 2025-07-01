<template>
  <a-space  direction="vertical" class="space-alert" v-if="!token_alert_hide"  >
    <a-alert message="Here you can generate and manage tokens, edit the email address for receiving emails, and configure SMTP. A token serves as a unique identifier for email sending, bound to both the email recipient and the SMTP server. Before creating a new token, you need to first add the receiving email address and SMTP configuration." type="info" @close="onCloseAlert" closable  show-icon />
  </a-space>
  <a-table size="middle" :scroll="{ x: 500 }" :row-selection="{ type:'radio',selectedRowKeys: pageState.selectedRowKeys, onChange: onSelectChange }"
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
          <a-button @click="clickSendMail">sendMail</a-button>
        </a-space>
      </div>

    </template>
    <template #footer></template>
  </a-table>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import {createVNode, onMounted, reactive} from "vue";
import type {Token, Page, Pagination} from "@/interface/System";
import {fetchList, deleteToken} from "@/api/token";
import moment from "moment";
import {Modal} from "ant-design-vue";
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
import { useViewConfig } from '@/stores/system'
const viewConfig =useViewConfig()

const token_alert_hide = viewConfig.getConfig("token_alert_hide")

const  onCloseAlert = () => {
  viewConfig.setConfig("token_alert_hide", true)
}

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
      content: 'delete',
      okText: 'ok',
      cancelText: 'cancel',
      onOk: () => {
        deleteToken(Number(id)).then(() => {
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

const clickSendMail = ()=>{

  if (pageState.selectedRowKeys!.length > 0) {
    const id = pageState.selectedRowKeys![0]
    router.push("/token/sendMail/" + id)
  } else {
    Modal.confirm({
      title: 'sendMail',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'please select one',
      okText: 'ok',
      cancelText: 'cancel',
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
    title: 'SMTP',
    dataIndex: 'SMTPStr',
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
.space-alert{
  margin-bottom: 20px;

}
</style>
