<template>
  <div class="eg-container">
    <slot>
      <div class="label">
        <cs-label :label="label"></cs-label>
      </div>
      <cs-table :data="data" :columns="columns"></cs-table>
    </slot>
  </div>
</template>

<script setup>
import CsLabel from '../../../package/label/src/CsLabel.vue'
import CsTable from '../../../package/table/src/CsTable.vue'
import {defineProps} from "vue"

defineProps({
  label: {
    type: String,
    default: '基础用法（属性：label；text-align；show-under-line；showIcon）'
  },
  columns: {
    type: Array,
    default: () => {
      // 参数	说明	类型	可选值	默认值
      return [
        {label: '参数', prop: 'param'},
        {label: '说明', prop: 'description'},
        {label: '类型', prop: 'type'},
        {label: '可选值', prop: 'values'},
        {label: '默认值', prop: 'default'}
      ]
    }
  },
  data: {
    type: Array,
    default: () => {
      return [
        {
          param: 'label',
          description: '标签名称',
          type: 'String',
          values: '',
          default: '',
        }, {
          param: 'showIcon',
          description: '是否显示标签前缀',
          type: 'Boolean',
          values: 'true/false',
          default: 'true',
        }, {
          param: 'showUnderLine',
          description: '是否显示下划线',
          type: 'Boolean',
          values: 'true/false',
          default: 'true',
        }, {
          param: 'textAlign',
          description: '文本位置',
          type: 'String',
          values: 'left/right/center',
          default: 'left',
        }
      ]
    }
  }
})
</script>

<style scoped lang="less">
.eg-container {
  border: 1px solid @border-color;
  border-radius: 3px;
  transition: .2s;
  margin-bottom: 24px;
  padding: 15px;
  .label {
    padding-bottom: 10px;
  }
}
</style>