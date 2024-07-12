<template>
  <a-layout :style="{height:'100%'}">
    <a-layout-header :style="headerStyle">Initialization</a-layout-header>
    <a-layout-content :style="contentStyle">
      <main :style="{display: 'flex',justifyContent: 'center', paddingTop: '20px'}">
        <a-card :bordered="false" :style="{width:'600px',borderRadius:'0px'}">

          <a-card title="select db">

            <a-form layout="vertical" :wrapper-col="wrapperCol" :model="formState">
              <a-form-item label="select db">
                <a-select v-model:value="formState.dbType" placeholder="please select your db">
                  <a-select-option value="mysql">mysql</a-select-option>
                  <a-select-option value="sqlite">sqlite</a-select-option>
                </a-select>
              </a-form-item>

              <template v-if="formState.dbType=='sqlite'">
                <a-form-item label="filename">
                  <a-input v-model:value="formState.sqlite!.filename" placeholder="filename"/>
                </a-form-item>
              </template>
              <template v-if="formState.dbType=='mysql'">
                <a-form-item label="host">
                  <a-input v-model:value="formState.mysql!.host" placeholder="host"/>
                </a-form-item>
                <a-form-item label="port">
                  <a-input v-model:value="formState.mysql!.port" placeholder="port"/>
                </a-form-item>
                <a-form-item label="dbname">
                  <a-input v-model:value="formState.mysql!.dbname" placeholder="dbname"/>
                </a-form-item>
                <a-form-item label="username">
                  <a-input v-model:value="formState.mysql!.username" placeholder="username"/>
                </a-form-item>
                <a-form-item label="password">
                  <a-input-password v-model:value="formState.mysql!.password" placeholder="password"/>
                </a-form-item>
                <a-form-item label="charset">
                  <a-input v-model:value="formState.mysql!.charset" placeholder="charset"/>
                </a-form-item>
              </template>

            </a-form>

          </a-card>

          <a-card title="Admin Account" :style="{marginTop:'10px'}">

            <a-form layout="vertical"  :wrapper-col="wrapperCol">
              <a-form-item label="username">
                <a-input v-model:value="formState.manage!.username" placeholder="username"/>
              </a-form-item>
              <a-form-item label="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.manage!.password" name="password" placeholder="password"/>
              </a-form-item>
              <a-form-item label="confirm password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.manage!.confirmPassword" placeholder="confirm password"/>
              </a-form-item>

            </a-form>

          </a-card>
          <a-form :model="formState" @finish="handleFinish(formState)" :wrapper-col="wrapperCol"
                  :style="{marginTop:'20px'}">

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <template v-if="formState.dbType=='mysql'">
                <a-button type="primary" html-type="submit">testDB</a-button>
              </template>
              <a-button html-type="submit" style="margin-left: 10px">setup</a-button>
            </a-form-item>

          </a-form>

        </a-card>
      </main>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import type {CSSProperties} from 'vue';
import {getDefaultSet, putSet} from "@/api/set";
import type {SetInfo} from "@/interface/System";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

const formState = reactive<SetInfo>(
    {
      dbType: "sqlite",
      sqlite: {filename: ""},
      mysql: {host: "", port: 0, dbname: "", username: "", password: "", charset: ""},
      reset: false,
      manage: {port: 0, webPath: "",username: "", password: "",confirmPassword:""},
      api: {port: 0}
    }
)

const handleFinish = (values: SetInfo) => {
  putSet(values).then((v)=>{
    router.push("/signIn")
  })
}


onMounted(() => {
  getDefaultSet().then((si: SetInfo) => {
    formState.dbType = si.dbType;
    formState.sqlite = si.sqlite;
    formState.mysql = si.mysql
    formState.manage = si.manage;
    formState.api = si.api;
    console.log(formState)
  })
})


const wrapperCol = {style: {marginBottom:"-10px"}};

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

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
};
</script>