<template>
  <a-page-header
    class="demo-page-header"
    :title="$route.params.id ? 'edit Schedule' : 'add Schedule'"
    @back="() => $router.go(-1)"
  >
    <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item ref="name" label="name" name="name">
        <a-input v-model:value="formState.name" placeholder="Enter the Schedule name." />
      </a-form-item>
      <a-form-item ref="token" label="token" name="token">
        <tags-select-modal
          selectionType="radio"
          v-model:selectedTags="formState.tokenSelectedTags"
          @handleTableChange="tokenHandleTableChange"
          :page-state="tokenPageState"
          @showSelect="tokenShowSelect"
          :columns="tokenColumns"
          :dataSource="tokenDataSource"
          >select TOKEN
        </tags-select-modal>
      </a-form-item>

      <a-form-item ref="cron" label="cron" name="cron">
        <a-input
          v-model:value="formState.cron"
          placeholder="Enter the Schedule cron.precise to the second"
        />
      </a-form-item>

      <a-divider>Request</a-divider>
      <a-form-item ref="url" label="url" name="url">
        <a-input v-model:value="formState.url" placeholder="Enter the URL for the request" />
      </a-form-item>
      <a-form-item label="method">
        <a-select v-model:value="formState.method" placeholder="Enter the method for the request">
          <a-select-option value="GET">GET</a-select-option>
          <a-select-option value="POST">POST</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-for="(header, index) in formState.headers"
        :key="index"
        :ref="'headers' + index"
        v-bind="
          index != 0
            ? { wrapperCol: { span: 14, offset: 5 } }
            : { wrapperCol: { span: 14, offset: 0 } }
        "
        :label="index == 0 ? 'headers' : ''"
        name="headers"
      >
        <a-input-group size="large">
          <a-row :gutter="5">
            <a-col :span="8">
              <a-input v-model:value="header.name" placeholder="Enter the Key for the header" />
            </a-col>
            <a-col :span="16">
              <a-input
                v-model:value="header.value"
                placeholder="Enter the Value for the header"
                style="width: 80%; margin-right: 8px"
              />
              <MinusCircleOutlined class="dynamic-delete-button" @click="removeDomain(header)" />
            </a-col>
          </a-row>
        </a-input-group>
      </a-form-item>

      <a-form-item
        :label="formState.headers.length === 0 ? 'headers' : ''"
        v-bind="
          formState.headers.length !== 0
            ? { wrapperCol: { span: 14, offset: 5 } }
            : { wrapperCol: { span: 14, offset: 0 } }
        "
      >
        <a-button type="dashed" style="width: 60%" @click="addDomain">
          <PlusOutlined />
          Add header field
        </a-button>
      </a-form-item>

      <a-form-item label="body" v-if="formState.method == 'POST'">
        <a-textarea
          v-model:value="formState.body"
          placeholder="Enter the Body for the request"
          :rows="4"
        />
      </a-form-item>
      <a-divider>Response</a-divider>
      <a-form-item ref="name" label="useTemplate" name="useTemplate">
        <a-switch v-model:checked="formState.useTemplate" />
      </a-form-item>
      <a-form-item label="template" v-if="formState.useTemplate">
        <a-textarea
          v-model:value="formState.template"
          placeholder="Enter the Template for the response"
          :rows="4"
        />
      </a-form-item>

      <a-form-item ref="isSendOnlyByError" label="Only Error Send Email" name="isSendOnlyByError">
        <a-switch
          v-model:checked="formState.isSendOnlyByError"
          placeholder="Send an email only when the HTTP status of the request is not 200."
        />
        <a-space
          direction="vertical"
          class="space-alert"
          style="margin-left: 10px; line-height: 10px; height: 10px"
        >
          <a-alert
            style="padding: 2px 10px 2px 10px"
            message="Send an email only when the HTTP status of the response is not 200."
            type="info"
            show-icon
          />
        </a-space>
      </a-form-item>

      <a-form-item ref="name" label="isUse" name="isUse">
        <a-switch v-model:checked="formState.isUse" />
      </a-form-item>

      <a-form-item label="operate">
        <a-button danger @click="onTest">test</a-button>
        <a-button style="margin-left: 10px" @click="onSubmit"
          >{{ id ? 'update' : 'save' }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Header, PageState, Schedule, Token } from '@/interface/System'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import TagsSelectModal from '@/components/tags-select-modal.vue'
import { fetchTokenList } from '@/api/token'
import { getSchedule, postSchedule, putSchedule, sendMailBySchedule } from '@/api/schedule'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { getApiUrl } from '@/util/request'

const router = useRouter()
const route = useRoute()

const id = ref(route.params.id)

const labelCol = { span: 5 }
const wrapperCol = { span: 13 }
const formState = reactive<Schedule>({ headers: [], url: getApiUrl('/scheduleTestApi') })
const tokenLoading = ref<Boolean>(false)
const tokenDataSource = ref<Array<Token>>([])
const tokenPageState = reactive<PageState>({
  total: 0,
  current: 1,
  pageSize: 2
})

const tokenColumns = [
  {
    title: 'token',
    className: 'token',
    dataIndex: 'token'
  },
  {
    title: 'subject',
    dataIndex: 'subject'
  },
  {
    title: 'receiveEmails',
    dataIndex: 'receiveEmailsStr'
  },
  {
    title: 'SMTP',
    dataIndex: 'SMTPStr'
  }
]

const removeDomain = (header: Header) => {
  formState.headers.splice(formState!.headers.indexOf(header), 1)
}

const addDomain = () => {
  formState.headers.push({ name: '', value: '' })
}

const queryToken = (current: Number) => {
  tokenLoading.value = true
  tokenPageState.current = current
  fetchTokenList(tokenPageState.current!, tokenPageState.pageSize!)
    .then((page) => {
      tokenPageState.total = <number>page.total
      tokenDataSource.value = page.list!
      tokenLoading.value = false
    })
    .catch(() => {
      tokenLoading.value = false
    })
}

const tokenShowSelect = () => {
  queryToken(tokenPageState!.current!)
}
const tokenHandleTableChange = (v: any) => {}

const onSubmit = () => {
  if (formState!.tokenSelectedTags && formState!.tokenSelectedTags!.length > 0) {
    formState.token = formState!.tokenSelectedTags![0].name
  }
  if (route.params.id) {
    putSchedule(formState).then(() => {
      router.go(-1)
    })
  } else {
    postSchedule(formState).then(() => {
      router.go(-1)
    })
  }
}
const onTest = () => {
  if (formState!.tokenSelectedTags && formState!.tokenSelectedTags!.length > 0) {
    formState.token = formState!.tokenSelectedTags![0].name
  }
  sendMailBySchedule(formState).then((v) => {
    message.success(v)
  })
}
</script>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
