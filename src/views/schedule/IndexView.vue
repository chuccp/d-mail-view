<template>
  <a-space direction="vertical" class="space-alert" v-if="!scheduled_alert_hide">
    <a-alert
      message="Implement project monitoring by using scheduled tasks to read a specified API and send emails based on the information provided by the api."
      type="info"
      @close="onCloseAlert"
      closable
      show-icon
    />
  </a-space>
  <a-table
    size="middle"
    :scroll="{ x: 500 }"
    :row-selection="{
      type: 'radio',
      selectedRowKeys: pageState.selectedRowKeys,
      onChange: onSelectChange
    }"
    :columns="columns"
    :pagination="pageState"
    @change="handleTableChange"
    :loading="pageState.loading"
    :row-key="(record: any) => record.id"
    :customRow="
      (record: any) => {
        return {
          onClick: () => {
            onSelectChange([record.id])
          }
        }
      }
    "
    :data-source="pageState.list"
    bordered
  >
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <template #bodyCell="{ column, record }">

      <template v-if="column.key === 'token'">
        <a>
          {{ record.token }}
        </a>
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
<script setup lang="ts">
import moment from 'moment/moment'
import { onMounted, reactive } from 'vue'
import type { Mail, Page, Schedule } from '@/interface/System'
import { useRouter } from 'vue-router'
import { useViewConfig } from '@/stores/system'
import { fetchScheduleList } from '@/api/schedule'

const viewConfig = useViewConfig()
const scheduled_alert_hide = viewConfig.getConfig('scheduled_alert_hide')

const onCloseAlert = () => {
  viewConfig.setConfig('scheduled_alert_hide', true)
}

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
    title: 'name',
    dataIndex: 'name'
  },
  {
    title: 'token',
    className: 'token',
    dataIndex: 'token',
    key: 'token',
  },
  {
    title: 'isUse',
    className: 'isUse',
    dataIndex: 'isUse',
    customRender: (isUse: any) => {
      return isUse.value ? 'yes' : 'no'
    }
  },  {
    title: 'isOnlySendByError',
    className: 'isOnlySendByError',
    dataIndex: 'isOnlySendByError',
    customRender: (isOnlySendByError: any) => {
      return isOnlySendByError.value ? 'yes' : 'no'
    }
  },
  {
    title: 'cron',
    className: 'cron',
    dataIndex: 'cron'
  },
  {
    title: 'createTime',
    dataIndex: 'createTime',
    customRender: (text: any) => {
      return moment(text.value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: 'updateTime',
    dataIndex: 'updateTime',
    customRender: (text: any) => {
      return moment(text.value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]

const queryPage = () => {
  pageState.loading = true
  fetchScheduleList(pageState.current!, pageState.pageSize!)
    .then((page: Page<Schedule>) => {
      pageState.total = <number>page.total
      pageState.list = page.list
      pageState.loading = false
    })
    .catch(() => {
      pageState.loading = false
    })
}
onMounted(() => {
  queryPage()
})

const clickAdd = () => {
  router.push('/schedule/add')
}
const clickEdit = () => {}
const clickDelete = () => {}
const onSelectChange = (selectedRowKeys: any) => {}
const handleTableChange = (pagination: any) => {}
</script>

<style scoped>
.space-alert {
  margin-bottom: 20px;
}
</style>