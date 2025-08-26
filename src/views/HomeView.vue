<template>
  <a-page-header class="demo-page-header" title="How to use">
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
  const md = `
**Example of JSON format**

\`\`\`bash
curl -X POST 'http://127.0.0.1:${port}/sendMail' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "token": "{{token}}",
  "subject": "test",
  "content": "this is a test",
  "recipients": ["ops@example.com"],
  "files": [
    {
      "name": "alert.log",
      "data": "{{base64_content}}"
    }
  ]
}'
\`\`\`

**Example of form submission**

\`\`\`bash
curl -X POST 'http://127.0.0.1:${port}/sendMail' \\
--form 'token={{token}}' \\
--form 'subject=test' \\
--form 'content=this is a test' \\
--form 'recipients=finance@example.com,sales@example.com' \\
--form 'files=@"/data/reports/sales.pdf"' \\
--form 'files=@"/data/reports/expenses.xlsx"'
\`\`\`
**Example of get request**
\`\`\`bash
curl 'http://127.0.0.1:${port}/sendMail?token={{token}}&subject=test&content=this%20is%20a%20test&recipients=aaa@mail.com,bbb@mail.com'
\`\`\`


  `
  return md
}

const post = ref('')

onMounted(() => {
  readSet().then((v) => {
    post.value = getMD(v.api?.port)
  })
})
</script>

<style scoped></style>