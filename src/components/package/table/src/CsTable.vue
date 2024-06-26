<template>
  <div id="tableContainer" ref="container" class="cs-table-container cs-scrollbar">
    <table class="cs-table">
      <tr class="text-title cs-deep-background-color">
        <th :class="{
              'text-title-item': true,
              'width50': isCheckboxOrSerial(item)
            }"
            :align="textAlign"
            :key="`columns_title_${index}`"
            v-for="(item, index) of _columns">
            <span v-if="item.type === 'checkbox'"
                  :class="[
                'cell-text',
                 {
                   'disabled': rowDisabled,
                 }
                 ]">
              <input
                  type="checkbox"
                  :id="titleCheckboxId"
                  class="table-checkbox"
                  :name="index"
                  :value="index"
                  @change="handleSelectAll"/>
            </span>
          <span v-else
                :class="[
                    'cell-text',
                     `text-${textAlign}`,
                     {
                       'cell-text-overflow': isOverHidden
                     }
                     ]">
                {{ item.label }}
            </span>
        </th>
      </tr>
      <tr
          class="text-title text-cell-item"
          :key="`row_${rowIndex}`"
          v-for="(row, rowIndex) of data">
        <td
            :class="[
              'text-cell-item',
              {'width50': isCheckboxOrSerial(item)}
            ]"
            :align="textAlign"
            :key="`row_columns_title_${index}`"
            v-for="(item, index) of _columns">
            <span v-if="item.type === 'serial'" :class="[
              'cell-text',
               `text-center`,
               {
                 'cell-text-overflow': isOverHidden
               }
               ]">
              {{ item.format ? item.format(rowIndex + 1) : rowIndex + 1 }}
            </span>
          <span v-else-if="item.type === 'checkbox'"
                :class="[
                    'cell-text',
                    `text-center}`,
                     {
                       'disabled': colDisabled(row)
                     }
                     ]">
                  <input
                      type="checkbox"
                      :name="checkboxName"
                      class="table-checkbox"
                      :value="rowIndex"
                      :checked="props.data[rowIndex].tempCheckedFlag"
                      @change="handleSelect($event, row, rowIndex)"/>
            </span>
          <span v-else :class="[
              'cell-text',
               `text-${item.align || 'center'}`,
               {
                 'cell-btn': item.event,
                 'cell-text-overflow': isOverHidden
               }]"
                @click="handleCellClick(row, item)">
              {{ item.format ? item.format(row[item.prop] || '') : (row[item.prop] || '------') }}
            </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import {defineProps, onMounted, getCurrentInstance, ref, computed, reactive} from 'vue'
import {generateRandom} from '../../../lib/utils'

let span = ref(0)
let width = ref(0)
let rowWidth = ref(0)
let _columns = reactive(props.columns)
const checkboxName = generateRandom()
const titleCheckboxId = generateRandom()

const {proxy} = getCurrentInstance()

const container = ref(null)

onMounted(() => {
  proxy.width = container._value.offsetWidth
  proxy.rowWidth = computedWidth(proxy)
  console.info(proxy.width)
})

const setSpan = (span, index = 0) => {
  const temp = (proxy.width - span) / (props.columns.length - index)
  console.info(temp)
  return temp > 100 ? temp : 100
}

const computedWidth = (proxy) => {
  let widthSum = 0
  _columns.map((value, index) => {
    if (value.width) {
      widthSum += Number(value.width)
      proxy.span = setSpan(widthSum, index)
    } else {
      proxy.span = setSpan(widthSum, index)
      value.width = Number(proxy.span)
      widthSum += Number(proxy.span)
    }
    return value
  })
  return widthSum
}

const handleSelectAll = (e) => {
  if (rowDisabled.value) {
    return false
  }
  const checkbox = document.getElementsByName(checkboxName)
  checkbox.forEach(value => value.checked = e.target.checked)
  console.info('handleSelectAll', e.target.checked)
  props.data.map(value => {
    value.tempCheckedFlag = e.target.checked
    return value
  })
  handleSelectChange()
}

const emits = defineEmits(['on-select', 'on-select-change'])

const handleSelectChange = () => {
  const selection = []
  props.data.forEach(value => {
    const item = {}
    if (value.tempCheckedFlag) {
      props.columns.forEach(col => {
        if (!col.type) {
          item[col.prop] = value[col.prop] || ''
        }
      })
      selection.push({...item, ...value})
    }
  })
  const dom = document.getElementById(titleCheckboxId)
  dom.checked = selection.length !== 0
  console.info('on-select-change', selection)
  emits('on-select-change', selection)
}

const handleSelect = (e, row, index) => {
  console.info(index)
  if (colDisabled(row)) return false
  row.tempCheckedFlag = e.target.checked
  emits('on-select', {row: row, index: index, checked: e.target.checked})
  handleSelectChange()
}

const handleCellClick = (row, item) => {
  if (item.event) {
    emits(`on-${item.event}`, row, item)
  }
}

const rowDisabled = computed(() => {
  const flags = []
  props.data.forEach(value => {
    flags.push(colDisabled(value))
  })
  console.info(flags)
  return flags.includes(true)
})

const colDisabled = (row) => {
  if (props.selectable) {
    const isFunction = Object.prototype.toString.call(props.selectable) === "[object Function]"
    if (isFunction) {
      return props.selectable(row)
    }
  }
  return false
}

const isCheckboxOrSerial = (item) => {
  return ['serial', 'checkbox'].includes(item.type)
}

const props = defineProps({
  isOverHidden: {
    type: Boolean,
    default: true
  },
  selectable: {
    type: Function,
    default: null
  },
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
.cs-table-container {
  width: 100%;
  overflow: auto;

  .cs-table {
    width: 100%;
    border-spacing: 0;

    & td, th {
      min-width: 100px;
      border: 1px solid @border-color;
    }

    .text-title {
      width: 100%;
      box-sizing: border-box;

      .text-title-item {
        font-size: 16px;
        font-weight: bold;
        padding: 10px 5px;
        box-sizing: border-box;
      }

      .text-cell-item {
        font-size: 14px;
        padding: 10px 5px;
        font-weight: bold;
        box-sizing: border-box;
        align-items: center;
      }

      .cell-text {
        width: 100%;
      }

      .cell-btn {
        cursor: pointer;
      }

      .cell-text-overflow {
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.table-checkbox {
  width: 14px;
  height: 14px;
}

.width50 {
  min-width: 50px !important;
}
</style>