<template>
  <a-form-item-rest>
    <div>
      <a-tag v-for="(item) in selectedTags"  :key="item.name" closable @close.prevent="tagsClose(item)">{{ item.name }}</a-tag>
      <a-tag style="background: #fff; border-style: dashed;cursor: pointer" @click="showSelect">
        <plus-outlined/>
        <slot></slot>
      </a-tag>
    </div>
    <select-modal @handleOk="handleOk" :selectionType="selectionType"
                  v-model:selectedTags="selectedTags"
                  v-model:selectedRowKeys="selectedRowKeys"
                  @handleTableChange="handleTableChange"
                  :pageState="props.pageState"
                  :columns="props.columns"
                  :loading="props.loading"
                  :dataSource="props.dataSource"
                  v-model:open="open"></select-modal>
  </a-form-item-rest>
</template>
<script setup lang="ts">

import {PlusOutlined} from "@ant-design/icons-vue";
import {ref, watch} from "vue";
import type {PageState, Select} from "@/interface/System";
import SelectModal from "@/components/select-modal.vue";

const props = defineProps({
  columns: Array,
  dataSource: Array<any>,
  pageState: Object,
  loading: Boolean,
  selectionType: String,
})

const selectedTags =defineModel<Array<Select>>('selectedTags')

const selectedRowKeys = ref<Array<number>>([])




const emits = defineEmits([ "showSelect", "handleTableChange"])
const open = ref<boolean>(false)

const tagsClose = (item: Select) => {
  selectedTags.value = selectedTags.value!.filter((v) => v.id != item.id)
  selectedRowKeys.value = selectedRowKeys.value.filter((v) => v != item.id)
}
const showSelect = () => {
  open.value = true
  emits('showSelect')
}

const handleOk = () => {
}

const handleTableChange = (v: any) => {
  emits('handleTableChange', v)
}

</script>


<style scoped>

</style>