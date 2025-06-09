<template>
  <a-page-header
    class="demo-page-header"
    :title="$route.params.id?'edit Schedule':'add Schedule'"
    @back="() => $router.go(-1)"
  >
    <template #footer>
      <a-button type="primary">保存</a-button>
    </template>
  </a-page-header>
</template>
<script setup lang="ts">

</script>



<style scoped>

</style>