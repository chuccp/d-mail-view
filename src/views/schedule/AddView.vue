<template>
  <a-page-header
    class="demo-page-header"
    :title="$route.params.id ? 'edit Schedule' : 'add Schedule'"
    @back="() => $router.go(-1)"
  >
    <a-form

      ref="formRef"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="name" name="name">
        <a-input v-model:value="formState.name" placeholder="Enter the Schedule name." />
      </a-form-item>
      <a-form-item ref="token" label="token" name="token">
        <a-input v-model:value="formState.token" placeholder="Select the Schedule token." />
      </a-form-item>
      <a-form-item ref="url" label="url" name="url">
        <a-input v-model:value="formState.url" placeholder="Enter the URL for the request" />
      </a-form-item>
      <a-form-item label="method">
        <a-select placeholder="Enter the method for the request">
          <a-select-option value="GET">GET</a-select-option>
          <a-select-option value="POST">POST</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-for="(header, index) in dynamicHeaders.headers" :key="index" :ref="'headers'+index" v-bind="index != 0 ? {} : {}"  :label="index==0?'headers':''" name="headers">
        <a-input-group size="large">
          <a-row :gutter="5">
            <a-col :span="8">
              <a-input  v-model:value="header.name"  placeholder="Enter the Key for the header" />
            </a-col>
            <a-col :span="16">
            <a-input  v-model:value="header.value"   placeholder="Enter the Value for the header" style="width: 80%; margin-right: 8px" />
              <MinusCircleOutlined class="dynamic-delete-button" />
            </a-col>
          </a-row>
        </a-input-group>
      </a-form-item>

      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%">
          <PlusOutlined />
          Add header field
        </a-button>
      </a-form-item>

      <a-form-item label="body">
        <a-textarea v-model:value="formState.body" placeholder="Enter the Body for the request" :rows="4" />
      </a-form-item>
      <a-form-item ref="name" label="useTemplate" name="useTemplate">
        <a-switch v-model:checked="formState.useTemplate"/>
      </a-form-item>
      <a-form-item label="template">
        <a-textarea v-model:value="formState.template" placeholder="Enter the Template for the response" :rows="4" />
      </a-form-item>
      <a-form-item ref="name" label="isUse" name="isUse">
        <a-switch v-model:checked="formState.isUse"/>
      </a-form-item>

      <a-form-item ref="cron" label="cron" name="cron">

        <a-input v-model:value="formState.cron" placeholder="Enter the Schedule cron." />
      </a-form-item>

      <a-form-item label="operate">
        <a-button danger >test</a-button>
        <a-button style="margin-left: 10px">save</a-button>
      </a-form-item>


    </a-form>
  </a-page-header>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import type { Header, Schedule } from '@/interface/System'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 10, offset: 5 },
    sm: { span: 10, offset:5 },
  },
};
const labelCol = {span: 5};
const wrapperCol = {span: 13};
const formState = reactive<Schedule>({})
const dynamicHeaders = reactive<{ headers: Header[] }>({headers:[{name:'aaa',value:'bbb'},{name:'ccc',value:'ddd'}]})
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
