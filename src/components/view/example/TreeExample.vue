<template>
  <div>
    <div class="margin-bottom">
      <cs-label label="树结构组件"></cs-label>
    </div>
    <eg-container
        label="基础用法"
        type="params"
        :data="data"
    ></eg-container>
    <eg-container
        label="Event 事件"
        type="methods"
        :data="methodsData"
    ></eg-container>
    <eg-container>
      <cs-label class="margin-bottom" label="示例"></cs-label>
      <cs-tree :current-item="currentItem" :options="options"></cs-tree>
    </eg-container>
  </div>
</template>

<script setup>
import CsTree from '../../package/tree/src/CsTree.vue'
import CsLabel from '../../package/label/src/CsLabel.vue'
import EgContainer from "./components/EgContainer.vue"
import {reactive} from "vue"

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

const data = [
  {
    param: 'isBold',
    description: '是否加粗文本',
    type: 'Boolean',
    values: 'true/false',
    default: 'false',
  }, {
    param: 'propObj',
    description: '层级字段映射',
    type: 'Object',
    values: '',
    default: '{\n' +
      '  value: \'value\',\n' +
      '  label: \'label\',\n' +
      '  children: \'children\'\n' +
      '}',
  }, {
    param: 'options',
    description: '树结构数据: 字段包含propObj的数组对象',
    type: 'Array',
    values: '【{ ...propObj }...】',
    default: '',
  }
]

const methodsData = [
  {name: 'on-click', description: 'node 点击事件', params: 'node data'},
]

</script>

<style scoped>

</style>
