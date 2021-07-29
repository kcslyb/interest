<template>
  <div class="tree-container">
    <div class="tree-content" :key="index + item[propObj.value]" v-for="(item, index) of options">
      <div :class="{'tree-content-box': true, 'node-active': item[propObj.value] === currentItem[propObj.value]}">
        <div
            :class="[
          'tree-content-icon',
          (item[propObj.children] && (item[propObj.children].length > 0))
           ? (item.expanded ? 'tree-icon-left': 'tree-icon-bottom') : ''
        ]"
            @click.stop="clickIcon(item, true)"></div>
        <div class="tree-content-label" @click.stop="clickNode(item)">{{ item[propObj.label] }}</div>
      </div>
      <div class="tree-option" v-show="!item.expanded">
        <div :key="index + optIndex + opt[propObj.value]" v-for="(opt, optIndex) of item[propObj.children] || []">
          <div
              :class="[
            'tree-option-item']">
            <div :class="{'tree-content-box': true, 'node-active': opt[propObj.value] === currentItem[propObj.value]}">
              <div
                  :class="[
                  'tree-content-icon',
                  (opt[propObj.children] && (opt[propObj.children].length > 0))
                   ? (opt.expanded ? 'tree-icon-left': 'tree-icon-bottom') : ''
                ]"
                  @click.stop="clickIcon(opt, true)"></div>
              <div class="tree-content-label" @click.stop="clickNode(opt)">{{ opt[propObj.label] }}</div>
            </div>
            <div class="tree-option" v-show="!opt.expanded">
              <cs-tree
                  :prop-obj="propObj"
                  :current-item="currentItem"
                  :options="opt[propObj.children]"
                  @click-icon="clickIcon($event, false)"
                  @click-node="clickNode"></cs-tree>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, reactive} from 'vue'
defineProps({
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
  },
  currentItem: {
    type: Object,
    default: () => {
    }
  }
})
const emits = defineEmits(["click-icon", "click-node"])
const clickIcon = (item, flag) => {
  if (flag) {
    item.expanded = !item.expanded
  }
  emits("click-icon", item)
}
const clickNode = (item) => {
  emits('click-node', item)
}
</script>

<style scoped lang="less">
.tree-container {
  text-align: left;
  font-size: 14px;
}

.tree-content {
  padding: 1px;
}

.tree-content-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  padding: 0;
  cursor: pointer;
}

.tree-content-icon {
  padding-right: 6px;
  width: 6px;
}

.tree-content-label {
  padding: 2px;
  font-size: 14px;
  width: 100%;
}

.tree-option {
  padding-left: 10px;
}

.tree-option-item {
  padding: 2px;
  font-size: 14px;
}

.tree-icon-left::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-left: 6px solid @deep-border-color;
  border-bottom: 4px solid transparent;
}

.tree-icon-bottom::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid @deep-border-color;
}

.node-active {
  border-radius: 2px;
  color: @active-color;
  background-color: @active-background-color;
}
</style>