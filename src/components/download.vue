<template>
  <a-card bordered="false" hoverable="hoverable" class="download-view">
    <template #extra> <a-button type="dashed">hide</a-button></template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  </a-card>
</template>

<script setup lang="ts">
interface DataItem {
  title: string;
}
const data: DataItem[] = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
</script>

<style scoped>
.download-view{
  position: absolute;
  z-index: 99999;
  bottom: 15px;
  right: 15px;
  background: white;
  width: 800px;
}
</style>