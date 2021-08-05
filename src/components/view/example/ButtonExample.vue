<template>
  <div>
    <div class="margin-bottom">
      <cs-label label="按钮组件"></cs-label>
    </div>
    <eg-container
        label="基本用法 参数介绍"
        :data="propData"
        :columns="propColumns">
    </eg-container>
    <eg-container
        label="事件 Event"
        :data="[
            {name: 'on-click', description: '点击事件', params: 'dom 事件 e'},
        ]"
        :columns="[
          {label: 'name', prop: 'name'},
          {label: '说明', prop: 'description'},
          {label: '参数', prop: 'params'},
        ]">
    </eg-container>
    <div class="margin-bottom">
      <cs-label label="按钮组组件"></cs-label>
    </div>
    <eg-container
        label="基本用法 参数介绍"
        :data="groupPropData"
        :columns="propColumns">
    </eg-container>
    <eg-container
        label="事件 Event"
        :data="[
            {name: 'on-click', description: '点击事件', params: 'btnList 中的点击项'},
        ]"
        :columns="[
          {label: 'name', prop: 'name'},
          {label: '说明', prop: 'description'},
          {label: '参数', prop: 'params'},
        ]">
    </eg-container>
    <eg-container>
      <cs-label class="margin-bottom" label="示例"></cs-label>
      <cs-label class="margin-bottom" label="基础用法"></cs-label>
      <div class="text-left margin-bottom">
        <cs-button span>基本</cs-button>
        <cs-button span type="text">文本</cs-button>
        <cs-button span type="primary">主要</cs-button>
        <cs-button type="warning">警告</cs-button>
      </div>
      <cs-label class="margin-bottom" label="禁用"></cs-label>
      <div class="text-left margin-bottom">
        <cs-button disabled type="text">文本</cs-button>
      </div>
      <cs-label class="margin-bottom" label="按钮组"></cs-label>
      <div class="text-left margin-bottom">
        <cs-button-group :btn-list="btnList"></cs-button-group>
      </div>
    </eg-container>
  </div>
</template>

<script setup>
import CsLabel from '../../package/label/src/CsLabel.vue'
import CsButton from '../../package/button/src/CsButton.vue'
import CsButtonGroup from "../../package/button/src/CsButtonGroup.vue"
import EgContainer from "./components/EgContainer.vue"
import {reactive} from "vue"
const btnList = reactive([
  {
    type: 'info',
    label: 'info'
  }, {
    type: 'text',
    label: 'text'
  }
])

const propColumns = [
  {label: '参数', prop: 'param'},
  {label: '说明', prop: 'description'},
  {label: '类型', prop: 'type'},
  {label: '可选值', prop: 'values'},
  {label: '默认值', prop: 'default'}
]
const propData = [
  {
    param: 'span',
    description: '后面是否跟间距',
    type: 'Boolean',
    values: 'true/false',
    default: 'false'
  }, {
    param: 'type',
    description: '按钮类型',
    type: 'String',
    values: 'info/warning/primary/text',
    default: 'info',
  }, {
    param: 'disabled',
    description: '是否禁用',
    type: 'Boolean',
    values: 'true/false',
    default: 'false'
  }
]
const groupPropData = [
  {
    param: 'btnList',
    description: '生成按钮参数数组',
    type: 'Array',
    values: '[{label: 显示值, ...单个按钮组件的所有参数}]',
    default: ''
  }
]

</script>

<style scoped>

</style>
