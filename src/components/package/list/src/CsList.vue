<template>
  <div class="list-container">
    <div class="list-content" :key="`list_item_${index}`" v-for="(item, index) of options">
      <div
          :class="[
              'list-title',
              `text-${align}`,
              {'list-active': isActive(item)}]"
          @click.stop="clickItem(item)">
        {{ getObjValue(item, propObj.label) }}
      </div>
      <div
          :class="[
              'list-label',
               `text-${align}`,
               {'list-active': isActive(child)}]"
          :key="`list_item_child_${index}`"
          v-for="(child, index) of item[propObj.children]"
          v-show="item[propObj.children] && item[propObj.children].length"
          @click.stop="clickItem(child)">
        {{ getObjValue(child, propObj.label) }}
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive, defineProps, defineEmits} from "vue";
import {getObjValue} from "../../../lib/utils";

const props = defineProps({
  align: {
    type: String,
    default: 'left'
  },
  propObj: {
    type: Object,
    default: () => {
      return {
        value: 'value',
        label: 'label',
        children: 'children'
      }
    }
  },
  options: {
    type: Array,
    default: () => reactive([
      {
        label: '1级标签',
        value: 'components',
        children: [
          {
            label: '1-1级标签',
            value: 'components-label-example',
            children: []
          },
          {
            label: '1-2级标签',
            value: 'components-button-example',
            children: []
          }
        ]
      }
    ])
  }
})

const isActive = (item) => {
  const {value} = props.propObj
  return getObjValue(data.currentItem, value) === getObjValue(item, value)
}

const data = reactive({
  currentItem: {}
})

data.currentItem = props.options.length > 0 ? props.options[0] : {}

const emits = defineEmits(["click-item"])
const clickItem = (item) => {
  data.currentItem = item
  emits('click-item', item)
}

</script>

<style scoped lang="less">
.list-container {
  width: 100%;

  .list-content {
    font-weight: bold;

    .list-title {
      font-size: 16px;
      padding: 10px 5px;
      cursor: pointer;
      border-radius: 3px;

      &:hover {
        color: @simple-color;
      }
    }

    .list-label {
      font-size: 14px;
      padding: 10px 5px;
      color: @default-color;
      cursor: pointer;
      border-radius: 3px;

      &:hover {
        color: @simple-color;
      }
    }

    .list-active {
      color: @active-color;
      background-color: @active-background-color;
    }
  }
}
</style>