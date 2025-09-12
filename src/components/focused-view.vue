<template>
  <template v-for="(item, index) in splitByDelimiter(props.text!, props.searchKey)" :key="index">
    <template v-if="item == props.searchKey">
      <span style="color: red">{{ item }}</span>
    </template>
    <template v-else>
      {{ item }}
    </template>
  </template>
</template>
<script setup lang="ts">
const props = defineProps({
  text: String,
  searchKey: String
})

const splitByDelimiter = (str: string, delimiter?: string) => {
  if (!str){
    return []
  }
  if (!delimiter){
    return [str]
  }

  let index = str.indexOf(delimiter);
  if(index>10){
    index = index - 10;
  }
  str = str.slice(index);
  // 使用正则表达式创建动态分隔符，防止特殊字符问题
  const regex = new RegExp(delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
  // 切割字符串并保留分隔符
  const result = []
  let lastIndex = 0
  let match
  // 使用正则表达式查找所有分隔符的位置
  while ((match = regex.exec(str)) !== null) {
    // 添加分隔符前的子串
    if (match.index > lastIndex) {
      result.push(str.slice(lastIndex, match.index))
    }
    // 添加分隔符本身
    result.push(match[0])
    lastIndex = match.index + match[0].length
  }
  // 添加剩余的部分
  if (lastIndex < str.length) {
    result.push(str.slice(lastIndex))
  }
  return result
}
</script>


