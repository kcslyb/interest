<template>
  <div class="list-container">
    <div class="list-content" :key="`list_item_${index}`" v-for="(item, index) of options">
      <div
          :class="['list-title', `text-${align}`]"
          @click.stop="clickItem(item)">
        {{ item[propObj.label] }}
      </div>
      <div
          :class="['list-label', `text-${align}`]"
          :key="`list_item_child_${index}`"
          v-for="(child, index) of item[propObj.children]"
          v-show="item[propObj.children] && item[propObj.children].length"
          @click.stop="clickItem(child)">
        {{ child[propObj.label] }}
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive} from "vue";

defineProps({
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

const emits = defineEmits(["click-item"])
const clickItem = (item) => {
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

      &:hover {
        color: @simple-color;
      }
    }

    .list-label {
      font-size: 14px;
      padding: 10px 5px;
      color: @default-color;
      cursor: pointer;

      &:hover {
        color: @simple-color;
      }
    }
  }
}
</style>