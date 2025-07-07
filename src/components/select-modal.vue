<template>
  <a-modal width="700px" v-model:open="open" @ok="handleOk">

    <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:selectionType }"
        :columns="columns"
        @change="handleTableChange"
        :pagination="pageState" :loading="loading"
        :row-key="(record:any) => record.id"
        :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>
        <div class="table-operations">
          <a-space wrap>
            <a-tag v-for="(item) in selectedTags" :key="item.name" closable @close.prevent="tagsClose(item)">{{ item.name }}
            </a-tag>
          </a-space>
        </div>
      </template>
      <template #footer></template>
    </a-table>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type {Select} from "@/interface/System";

const props = defineProps({
  columns: Array,
  pageState: Object,
  dataSource: Array,
  loading: Boolean,
  selectionType:String,
})
const selectedTags =defineModel<Array<Select>>('selectedTags')
const open =defineModel<Boolean>('open')
const selectedRowKeys =defineModel<Array<number>>('selectedRowKeys')

watch(() => props.dataSource, (newValue, oldValue) => {

  if(selectedTags.value){
    const selectIds =  selectedTags.value.map((v)=>v.id);
    selectedRowKeys.value = newValue!.filter((v1:any)=>selectIds.includes(v1.id)).map((v2:any)=>v2.id);
    console.log("====",selectedRowKeys.value)
  }else{
    selectedRowKeys.value = [];
  }
})


const tagsClose = (item: Select) => {
  selectedTags.value = selectedTags.value!.filter((v) => v.id != item.id);
  selectedRowKeys.value = selectedRowKeys.value!.filter((v) => v != item.id)
}
const handleTableChange = (v: any) => {
  emits('handleTableChange', v)
}

const onSelectChange = (vs: Array<number>) => {
  selectedRowKeys.value = vs
  const ids = props.dataSource?.map((v:any)=>v.id);
  const addRow = props.dataSource?.filter((data: any) => vs.includes(data!.id)).map((data: any) => ({"name": data.name, "id": data.id}));
  if(props.selectionType=="radio"){
    selectedTags.value = addRow!
  }else{
    const selectedTags_value = selectedTags.value!.filter((v:any)=>(!ids!.includes(v.id)))
    selectedTags.value = selectedTags_value.concat(addRow!)
  }
}

const emits = defineEmits(["update:open","handleTableChange","handleOk"])
const handleOk = () => {
  emits('update:open', false)
  emits('handleOk', selectedTags.value)
}

</script>

<style scoped>

</style>