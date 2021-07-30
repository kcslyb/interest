<template>
  <div class="text-container">
    <div class="text-title">
      <span
          v-show="columns.length > 0"
          :class="[
              'text-title-item',
              `text-${textAlign}`,
               {
                 'cs-border-right': (index < columns.length - 1)
               }
          ]"
          :style="`width: ${span}%`"
          :key="`columns_title_${index}`"
          v-for="(item, index) of columns">
        {{ item.label }}
      </span>
    </div>
    <div class="text-title" :key="`row_${rowIndex}`" v-for="(row, rowIndex) of data">
      <span
          :class="[
              'text-cell-item',
              `text-${textAlign}`,
               {
                 'cs-border-right': (index < columns.length - 1)
               }
          ]"
          :style="`width: ${span}%`"
          :key="`row_columns_title_${index}`"
          v-for="(item, index) of columns">
        {{ row[item.prop] || '------'}}
      </span>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue'

const span = computed(() => {
  return (100 / props.columns.length)
})

const props = defineProps({
  textAlign: {
    type: String,
    default: 'center'
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
.text-container {
  width: 100%;
  .text-title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid @border-color;
    box-sizing: border-box;

    .text-title-item {
      flex-grow: 1;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 5px;
      box-sizing: border-box;
    }
    .text-cell-item {
      flex-grow: 1;
      font-size: 14px;
      padding: 10px 5px;
      font-weight: bold;
      box-sizing: border-box;
    }
  }
}
</style>