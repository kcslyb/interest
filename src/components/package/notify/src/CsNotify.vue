<template>
  <div
      :style="{zIndex: props.zIndex}"
      :class="['notify', 'animate__animated', 'animate__backInDown', `notify-${props.type}`]"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave">
    <div :class="['content']">
      <div :class="['content-title', `notify-${props.type}`]">{{ props.title }}</div>
      <div :class="['content-msg', `notify-${props.type}`]">{{ props.msg }}</div>
    </div>
    <div :class="['close', `notify-${props.type}`]" @click="handleClose">X</div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  zIndex: Number,
  title: String,
  msg: String,
  type: {
    type: String,
    default: 'default'
  }
})

const emits = defineEmits(['close', 'mouse-over', 'mouse-leave'])

const handleClose = () => {
  emits('close')
}

const handleMouseOver = () => {
  emits('mouse-over')
}

const handleMouseLeave = () => {
  emits('mouse-leave')
}

</script>

<style scoped lang="less">

.notify-default {
  color: @default-color;
}

.notify-error {
  color: @error-color;
}

.notify-warning {
  color: @warning-color;
}

.notify {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20%;
  border-radius: 5px;
  background-color: @cs-sd-color;

  .content {
    font-size: 14px;
    color: @default-color;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    .content-title {
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      font-weight: bold;
      word-break: break-all;
      -webkit-line-clamp: 1;
    }

    .content-msg {
      height: auto;
      line-height: 20px;
      padding: 0 10px 10px 10px;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
  }

  .close {
    position: absolute;
    top: 8px;
    right: 12px;
    cursor: pointer;
  }
}
</style>