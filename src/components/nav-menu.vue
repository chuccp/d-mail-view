<template>
  <a-menu v-model:selectedKeys="state.selectedKeys" @click="clickItem" :items="items" theme="dark"
          mode="inline"></a-menu>
</template>
<script setup lang="ts">

import {
  UploadOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  InboxOutlined,
  ScheduleOutlined, MailOutlined, SettingOutlined
} from '@ant-design/icons-vue'
import {reactive, h, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";

const state = reactive({
  collapsed: false,
  selectedKeys: ['0'],
});
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const routeLocationMatcheds = route.matched
  const routeLocationMatcheds2 = routeLocationMatcheds.reverse()
  for (const routeLocationMatched of routeLocationMatcheds2) {
    for (const item of items) {
      if (item.path == routeLocationMatched.path) {
        state.selectedKeys = [item.key]
        return
      }
    }
  }
})

const items = reactive([
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: 'Home',
    title: 'Home',
    path: '/'
  }, {
    key: '2',
    icon: () => h(PieChartOutlined),
    label: 'Log',
    title: 'Log',
    path: '/log'
  },{
    key: '3',
    icon: () => h(InboxOutlined),
    label: 'Token',
    title: 'Token',
    path: '/token'
  },{
    key: '4',
    icon: () => h(ScheduleOutlined),
    label: 'schedule',
    title: 'schedule',
    path: '/schedule'
  },
  {
    key: '5',
    icon: () => h(DesktopOutlined),
    label: 'SMTP',
    title: 'SMTP',
    path: '/smtp'
  },
  {
    key: '6',
    icon: () => h(MailOutlined),
    label: 'Mail',
    title: 'Mail',
    path: '/mail'
  },
  {
    key: '7',
    icon: () => h(SettingOutlined),
    label: 'Setting',
    title: 'Setting',
    path: '/set'
  }])


const clickItem = ({item}: { item: any }) => {
  router.push(item.path)
}

</script>

<style scoped>

</style>