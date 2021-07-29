<template>
  <div>
    <cs-label label="基础用法"></cs-label>
    <cs-tree :current-item="currentItem" :options="options"></cs-tree>
  </div>
</template>

<script setup>
import CsTree from '../../package/tree/src/CsTree.vue'
import CsLabel from '../../package/label/src/CsLabel.vue'
import {reactive} from "vue";
const currentItem = reactive({})
const options = reactive([
  {
    label: '1级标签',
    value: '1',
    children: [
      {
        label: '1-1级标签',
        value: '1-1',
        children: [
          {
            label: '1-1-1级标签',
            value: '1-1-1',
            children: []
          },
          {
            label: '1-1-2级标签',
            value: '1-1-2',
            children: [
              {
                label: '1-1-2-1级标签',
                value: '1-1-2-1',
                children: []
              },
              {
                label: '1-1-2-2级标签',
                value: '1-1-2-2',
                children: []
              }
            ]
          }
        ]
      },
      {
        label: '1-2级标签',
        value: '1-2',
        children: []
      }
    ]
  },
  {
    label: '2级标签',
    value: '2',
    children: [
      {
        label: '2-1级标签',
        value: '2-1',
        children: []
      },
      {
        label: '2-2级标签',
        value: '2-2',
        children: []
      }
    ]
  }
])
</script>

<style scoped>

</style>
