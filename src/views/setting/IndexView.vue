<template>
  <a-page-header
    class="demo-page-header"
    title="SETTING"
    @back="() => $router.go(-1)"
  >

      <a-card :bordered="false" title="Admin Account" :style="{marginTop:'10px'}">
        <a-form layout="vertical" >
          <a-form-item label="username">
            <a-input  placeholder="username"/>
          </a-form-item>
          <a-form-item label="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password  name="password" placeholder="password"/>
          </a-form-item>
        </a-form>
      </a-card>


    <a-card :bordered="false" title="http port" :style="{marginTop:'10px'}">
      <a-form layout="vertical" >
        <a-form-item label="api port">
          <a-input  name="api port" placeholder="api port"/>
        </a-form-item>
        <a-form-item label="manage port" >
          <a-input  name="manage port" placeholder="manage port"/>
        </a-form-item>
      </a-form>
    </a-card>

      <a-card  :bordered="false" >
        <a-space align="end" wrap>
          <a-button type="primary">save and restart</a-button>
        </a-space>
      </a-card>

  </a-page-header>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>