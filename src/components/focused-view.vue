<template>
  <div>
    {{show_text}}
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  text: String,
  // eslint-disable-next-line vue/no-reserved-props
  key:String,
})
const show_text = ref(props.text)
onMounted(()=>{
  show_text.value = show_text.value?.replace(new RegExp(props.key!, 'g'), `<span style="color:red">${props.key}</span>`)
})
</script>

<style scoped>

</style>