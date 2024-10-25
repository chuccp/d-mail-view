<template>
  <a-page-header
    class="demo-page-header"
    title="How to use"
  >
    <vue-markdown-it :source="post" :options="options" />

  </a-page-header>

</template>
<script setup lang="ts">
import { VueMarkdownIt } from '@f3ve/vue-markdown-it'
import { onMounted, reactive, ref } from 'vue'
import { getDefaultSet, readSet } from '@/api/set'
import type { SetInfo } from '@/interface/System'

const options = {
  html: true,
  linkify: true
}

const getMD = (port: number | Number | string | undefined) => {

  const md = '\n' +
    '**GET Request Example**:\n' +
    '\n' +
    '```powershell\n' +
    'curl \'http://127.0.0.1:'+port+'/sendMail?token={{token}}&content=this%20is%20a%20test&recipients=aaa@mail.com,bbb@mail.com\'\n' +
    '```\n' +
    '\n' +
    '**POST Request Example**:\n' +
    '\n' +
    '```powershell\n' +
    'curl -X POST \'http://127.0.0.1:'+port+'/sendMail\' \\\n' +
    '--header \'Content-Type: application/x-www-form-urlencoded\' \\\n' +
    '--data-urlencode \'token={{token}}\' \\\n' +
    '--data-urlencode \'content=this%20is%20a%20test\'\n' +
    '```'
    +'\n**Example of Sending an Email with Attachments**:\n' +
    '\n' +
    '```powershell\n' +
    'curl -X POST \'http://127.0.0.1:'+port+'/sendMail\' \\\n' +
    '--form \'files=@"/111111.txt"\' \\\n' +
    '--form \'files=@"/22222222222222.txt"\' \\\n' +
    '--form \'token={{token}}"\' \\\n' +
    '--form \'content=1212\'\n' +
    '```\n'+
    '**POST submission json format example**:\n' +
    '```powershell\n' +
    'curl -X POST \'http://127.0.0.1:'+port+'/sendMail\' \\\n' +
    '--header \'Content-Type: application/json\' \\\n' +
    '--data \'{\n' +
    '"token": "{{token}}",\n' +
    '"content":"this is a test",\n' +
    '"recipients":["aaa@mail.com","bbb@mail.com"]\n' +
    '}\'\n' +
    '```'
  return md

}

const post = ref("")

onMounted(() => {

  readSet().then((v) => {

    post.value = getMD(v.api?.port)



  })

})


</script>


<style scoped>

</style>