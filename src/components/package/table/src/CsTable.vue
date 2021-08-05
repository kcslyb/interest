<template>
  <div id="tableContainer" ref="container" class="text-container cs-scrollbar">
    <div class="text-title" :style="{width: `${proxy.rowWidth}px`}">
      <span
          v-show="columns.length > 0"
          :class="[
              'text-title-item',
               {
                 'cs-border-right': (index < columns.length - 1)
               }
          ]"
          :style="`width: ${item.width}%`"
          :key="`columns_title_${index}`"
          v-for="(item, index) of columns">
        <span v-if="item.type === 'checkbox'" :class="[
            'cell-text',
             `text-${textAlign}`,
             {
               'disabled': rowDisabled,
             }
             ]">
          <input
              type="checkbox"
              id="titleCheckbox"
              class="table-checkbox"
              :name="index"
              :value="index"
              @change="handleSelectAll"/>
        </span>
        <span v-else :class="[
            'cell-text',
             `text-${textAlign}`,
             {
               'cell-text-overflow': isOverHidden
             }
             ]">
          {{ item.label }}
        </span>
      </span>
    </div>
    <div
        class="text-title"
        :key="`row_${rowIndex}`"
        :style="{width: `${proxy.rowWidth}px`}"
        v-for="(row, rowIndex) of data">
      <span
          :class="[
              'text-cell-item',
               {
                 'cs-border-right': (index < columns.length - 1)
               }
          ]"
          :style="`width: ${item.width}%`"
          :key="`row_columns_title_${index}`"
          v-for="(item, index) of columns">
        <span v-if="item.type === 'serial'" :class="[
            'cell-text',
             `text-${textAlign}`,
             {
               'cell-text-overflow': isOverHidden
             }
             ]">
          {{ item.format ? item.format(rowIndex + 1) : rowIndex + 1 }}
        </span>
        <span v-else-if="item.type === 'checkbox'" :class="[
            'cell-text',
             `text-${textAlign}`,
             {
               'disabled': colDisabled(row)
             }
             ]">
          <input
              type="checkbox"
              name="checkboxName"
              class="table-checkbox"
              :value="rowIndex"
              @change="handleSelect($event, row, rowIndex)"/>
        </span>
        <span v-else :class="[
            'cell-text',
             `text-${textAlign}`,
             {
               'cell-btn': item.event,
               'cell-text-overflow': isOverHidden
             }]"
              @click="handleCellClick(row, item)">
          {{ item.format ? item.format(row[item.prop] || '') : (row[item.prop] || '------') }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import {defineProps, onMounted, getCurrentInstance, ref, computed} from 'vue'

let span = ref(0)
let width = ref(0)
let rowWidth = ref(0)

const { proxy } = getCurrentInstance()

const setSpan = (span) => {
  const temp = (proxy.width - span) / props.columns.length
  return temp > 100 ? temp : 100
}

const container = ref(null)

onMounted(() => {
  console.info('onMounted')
  console.info('width', container._value.offsetWidth)
  proxy.width = container._value.offsetWidth
  proxy.span = setSpan(0)
  console.info('span', proxy.span)
  proxy.rowWidth = computedWidth(proxy)
  console.info('rowWidth', proxy.rowWidth)
})

const computedWidth = (proxy) => {
  let widthSum = 0
  props.columns.map(value => {
    if (value.width) {
      widthSum += Number(value.width)
      proxy.span = setSpan(widthSum)
    } else {
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
  const checkbox = document.getElementsByName('checkboxName')
  checkbox.forEach(value => value.checked = e.target.checked)
  console.info('handleSelectAll', e.target.checked)
  props.data.map(value => {
    value.tempCheckedFlag =  e.target.checked
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
      selection.push(item)
    }
  })
  if (selection.length === 0) {
    const dom = document.getElementById('titleCheckbox')
    dom.checked = false
  } else if (selection.length === props.data.length) {
    const dom = document.getElementById('titleCheckbox')
    dom.checked = true
  }
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
.text-container {
  width: auto;
  overflow: auto;
  .text-title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border: 1px solid @border-color;
    box-sizing: border-box;

    .text-title-item {
      flex-grow: 1;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 5px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
    .text-cell-item {
      flex-grow: 1;
      font-size: 14px;
      padding: 10px 5px;
      font-weight: bold;
      box-sizing: border-box;
      display: flex;
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
.table-checkbox {
  width: 14px;
  height: 14px;
}
</style>