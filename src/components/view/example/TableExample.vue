<template>
  <eg-container>
    <cs-label label="表格组件"></cs-label>
    <cs-table
        :data="data"
        :columns="columns"
    ></cs-table>
  </eg-container>
  <eg-container
      label="参数 （columns、data 为必需字段）"
      type="params"
      :data="paramsData">
  </eg-container>
  <eg-container
      label="columns 参数（手动配置：label、prop 为必需字段）"
      type="params"
      :data="columnsParamsData">
  </eg-container>
  <eg-container
      label="事件 Event"
      type="methods"
      :data="methodsData">
  </eg-container>
</template>

<script setup>
import CsLabel from '../../package/label/src/CsLabel.vue'
import CsTable from '../../package/table/src/CsTable.vue'
import EgContainer from "./components/EgContainer.vue"

const paramsData = [
  {
    param: 'selectable',
    description: '根据该函数判断当前行是否可勾选,入参为当前行数据对象, 需要返回true/false',
    type: 'Function',
    values: '',
    default: 'null',
  }, {
    param: 'isOverHidden',
    description: '超出是否隐藏',
    type: 'Boolean',
    values: 'true/false',
    default: 'true',
  }, {
    param: 'textAlign',
    description: '表头单元格对齐方式',
    type: 'String',
    values: 'center/left/right',
    default: 'center',
  }, {
    param: 'columns',
    description: '表头名称及单元格取值字段，详情见columns参数',
    type: 'Array',
    values: 'eg: {label: 表头名称, prop: 取值字段名}',
    default: '',
  }, {
    param: 'data',
    description: '需展示数据',
    type: 'Array',
    values: 'eg: {param: \'参数\'}',
    default: '',
  }
]

const columnsParamsData = [
  {
    param: 'type',
    description: '生成可选列',
    type: 'String',
    values: 'checkbox',
    default: '',
  },
  {
    param: 'type',
    description: '生成序号列',
    type: 'String',
    values: 'serial',
    default: '',
  },
  {
    param: 'label',
    description: '表头名称',
    type: 'String',
    values: '',
    default: '',
  },
  {
    param: 'prop',
    description: '单元格取值字段',
    type: 'String',
    values: '',
    default: '',
  },
  {
    param: 'format',
    description: '格式化单元格值函数，入参为单元格值',
    type: 'Function',
    values: '',
    default: '',
  },
  {
    param: 'event',
    description: '点击单元格时进行回调, 回调事件 on-${item.event} ；参数为row: 当前行, item: columns item',
    type: 'String',
    values: '',
    default: '',
  },
  {
    param: 'align',
    description: '单元格对齐方式',
    type: 'String',
    values: 'left/center/right',
    default: 'center',
  }
]

const methodsData = [
  {
    name: 'on-select',
    description: '点击勾选事件',
    params: '{row: 单前行, index: 当前行序号， checked: 当前行是否选中}'
  },
  {
    name: 'on-select-change',
    description: '选择改变事件',
    params: '选中数组数据'
  },
]

const columns = [
  {type: 'checkbox', label: '序号', width: '50'},
  {type: 'serial', label: '序号', width: '50'},
  {label: '标签名称', prop: 'name'},
  {label: '单元格对齐方式', prop: 'textAlign'},
  {label: '单元格对齐方式', prop: 'textAlign'},
  {label: '单元格对齐方式', prop: 'textAlign'},
  {label: '单元格对齐方式', prop: 'textAlign'},
  {label: '单元格对齐方式', prop: 'textAlign'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'},
  {label: '表头名称及单元格字段', prop: 'columns'}
]

const data = [
  {
    name: '表格组件',
    textAlign: '居中对齐',
    columns: 'ScTable'
  },
  {
    name: '标签组件',
    textAlign: '表头名称及单元格字段表头名称及单元格字段表头名称及单元格字段表头名称及单元格字段左对齐',
    columns: 'ScLabel'
  }
]


</script>

<style scoped>

</style>