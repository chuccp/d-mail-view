<template>

  <a-page-header
      class="demo-page-header"
      :title="$route.params.id?'edit Token':'add Token'"
      @back="() => $router.go(-1)"
  >

    <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="token" name="token">
        <a-input v-model:value="formState.token"/>
      </a-form-item>
      <a-form-item ref="name" label="subject" name="subject">
        <a-input v-model:value="formState.subject"/>
      </a-form-item>
      <a-form-item ref="name" label="receiveEmail" name="receiveEmail">
        <tags-select-modal  v-model:selectedTags="formState.mailSelectedTags" @handleTableChange="mailHandleTableChange"
                           :page-state="mailPageState" @showSelect="mailShowSelect" :columns="mailColumns"
                           :dataSource="mailDataSource"></tags-select-modal>
      </a-form-item>
      <a-form-item ref="name" label="STMP" name="STMP">
        <tags-select-modal selectionType="radio" v-model:selectedTags="formState.STMPSelectedTags" @handleTableChange="STMPHandleTableChange"
                           :page-state="STMPPageState" @showSelect="STMPShowSelect" :columns="STMPColumns"
                           :dataSource="STMPDataSource"></tags-select-modal>
      </a-form-item>
      <a-form-item ref="name" label="isUse" name="isUse">
        <a-switch v-model:checked="formState.isUse"/>
      </a-form-item>
      <a-form-item label="operate">
        <a-button style="margin-left: 10px" @click="onSubmit">{{ id ? 'update' : 'save' }}</a-button>
      </a-form-item>
    </a-form>
  </a-page-header>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import type {PageState, Token} from "@/interface/System";
import {getToken, postToken, putToken} from "@/api/token";
import {fetchMailList} from "@/api/mail";
import {fetchSTMPList} from "@/api/stmp";
import {useRouter, useRoute} from "vue-router";
import {randomHex} from "@/util/string";
import moment from "moment/moment";
import type {Mail} from "@/interface/System";
import TagsSelectModal from "@/components/tags-select-modal.vue";

const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const formState = reactive<Token>({mailSelectedTags:[],STMPSelectedTags:[]})
const labelCol = {span: 5};
const wrapperCol = {span: 13};
onMounted(() => {
  if (route.params.id) {
    const id: string = route.params.id as string
    getToken(id).then((v) => {
      formState.id = Number(id)
      formState.token = v.token
      formState.isUse = v.isUse
      formState.STMPId = v.STMPId
      formState.subject = v.subject
      formState.mailSelectedTags=v.receiveEmails
      if(v.STMP){
        formState.STMPSelectedTags = [v.STMP!]
      }else{
        formState.STMPSelectedTags = []
      }
    })
  } else {
    formState.token = randomHex(32);
  }
})
const mailPageState = reactive<PageState>({
  total: 0,
  current: 1,
  pageSize: 2,
})
const mailShowSelect = () => {
  queryMail(mailPageState!.current!)
}
const mailDataSource = ref<Array<Mail>>([])
const mailLoading = ref<Boolean>(false)
const mailColumns = [
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
const queryMail = (current: Number) => {
  mailLoading.value = true
  mailPageState.current = current
  fetchMailList(mailPageState.current!, mailPageState.pageSize!).then((page) => {
    mailPageState.total = <number>page.total
    mailDataSource.value = page.list!
    mailLoading.value = false
  }).catch(() => {
    mailLoading.value = false
  })
}
const mailHandleTableChange = ({current}: { current: number }) => {
  queryMail(current)
}

const STMPPageState = reactive<PageState>({
  total: 0,
  current: 1,
  pageSize: 2,
})
const STMPShowSelect = () => {
  querySTMP(STMPPageState!.current!)
}
const STMPDataSource = ref<Array<Mail>>([])
const STMPLoading = ref<Boolean>(false)
const STMPColumns = [
  {
    title: 'mail',
    className: 'mail',
    dataIndex: 'mail',
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
const querySTMP = (current: Number) => {
  STMPLoading.value = true
  STMPPageState.current = current
  fetchSTMPList(STMPPageState.current!, STMPPageState.pageSize!).then((page) => {
    STMPPageState.total = <number>page.total
    STMPDataSource.value = page.list!
    STMPLoading.value = false
  }).catch(() => {
    STMPLoading.value = false
  })
}
const STMPHandleTableChange = ({current}: { current: number }) => {
  querySTMP(current)
}


const onSubmit = () => {
  if (route.params.id) {
    formState.STMPId = formState.STMPSelectedTags![0].id
    formState.receiveEmailIds  =formState.mailSelectedTags!.map(v=>v.id).join(",")
    putToken(formState).then(() => {
      router.go(-1)
    })
  } else {
    formState.STMPId = formState.STMPSelectedTags![0].id
    formState.receiveEmailIds  =formState.mailSelectedTags!.map(v=>v.id).join(",")
    postToken(formState).then(() => {
      router.go(-1)
    })
  }
}



</script>
<style scoped>

</style>