<template>
  <a-layout id="components-layout-demo-custom-trigger" :style="{height: '100%'}">
    <a-layout-sider :trigger="null" collapsible>
      <nav-menu></nav-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-flex justify="flex-end" align="center" style="padding-right: 15px">
          <a-dropdown>
            <a class="ant-dropdown-link" style="background-color: transparent" @click.prevent>
              <a-avatar :size="40">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0">
                  <a @click="doLogout">
                    安全退出
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-flex>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <RouterView/>
      </a-layout-content>
    </a-layout>
  </a-layout>

<!--  <download></download>-->


</template>
<script setup lang="ts">
import {RouterView, useRouter} from "vue-router";
import NavMenu from "@/components/nav-menu.vue";
import Download from "@/components/download.vue";
import {logout} from "@/api/login";
import {deleteLogin} from "@/util/localStore";
import {useSystem} from "@/stores/system";

import {
  MailOutlined,UserOutlined
} from '@ant-design/icons-vue';

const router = useRouter()
const {system} = useSystem();
const doLogout = () => {
  system.isInit = false
  logout().then(() => {
    deleteLogin()
    router.push("/signIn")
  })
}

</script>
<style>

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.ant-dropdown-link {
  background-color: transparent;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>