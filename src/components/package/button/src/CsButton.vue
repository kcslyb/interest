<template>
  <div :class="['button',`button-${type}`,
      {
        'disabled': disabled,
        'margin-right': span
      }
    ]"
       @click.stop="handleClick">
    <span class="text">
        <slot/>
    </span>
  </div>
</template>

<script setup>

import {defineProps} from "vue"

const props = defineProps({
  span: Boolean,
  type: {
    type: String,
    default: 'info'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['on-click'])
const handleClick = (e) => {
  if (props.disabled) {
    return false
  }
  emits('on-click', e)
}
</script>

<style scoped lang="less">
.button {
  height: 28px;
  padding: 0 5px;
  cursor: pointer;
  display: inline-flex;
  border-radius: 2px;
  min-width: 66px;
  text-align: center;

  .text {
    width: 100%;
    padding: 4px;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
  }
}

.margin-right {
  margin-right: 15px;
}

.disabled {
  cursor: not-allowed;
}

.button-info {
  color: @default-color;
  border: 1px solid @default-color;

  &:hover {
    color: white;
    background: @default-color;
  }
}

.button-warning {
  color: @warning-color;
  border: 1px solid @warning-color;

  &:hover {
    color: white;
    background: @warning-color;
  }
}

.button-primary {
  color: @primary-color;
  border: 1px solid @primary-color;

  &:hover {
    color: white;
    background: @primary-color;
  }
}

.button-text {
  color: @text-color;
  border: 1px solid @text-color;

  &:hover {
    color: white;
    background: @text-color;
  }
}
</style>