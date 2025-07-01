<template>
  <a-layout :style="{height:'100%'}">
    <a-layout-header :style="headerStyle">sign in</a-layout-header>
    <a-layout-content :style="contentStyle">
      <main :style="{display: 'flex',justifyContent: 'center', paddingTop: '20px'}">
        <a-card :bordered="false" :style="{width:'600px',borderRadius:'0px'}">
          <a-form layout="vertical" :wrapper-col="wrapperCol" @finish="onFinish" :model="formState">

            <a-form-item label="username">
              <a-input v-model:value="formState.username" placeholder="username"/>
            </a-form-item>
            <a-form-item label="password">
              <a-input-password v-model:value="formState.password" placeholder="password"/>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button html-type="submit" style="margin-left: 10px">sign in</a-button>
            </a-form-item>
          </a-form>

        </a-card>
      </main>
    </a-layout-content>

  </a-layout>
</template>
<script setup lang="ts">
import type {CSSProperties} from "vue";
import {reactive} from "vue";
import type {User} from "@/interface/System";
import {signIn} from "@/api/login";
import {useRouter} from "vue-router";
import {useSystem} from "@/stores/system";
const router = useRouter()
const {system} = useSystem();
const formState = reactive<User>(
    {
      username: "",
      password: "",
    }
)

const wrapperCol = {style: {marginBottom: "-10px"}};

const onFinish = () => {
  signIn(formState.username!, formState.password!).then((v) => {
    system.isInit = false
    router.push("/")
  });
}


const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
};
const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};
</script>
<style scoped>

</style>