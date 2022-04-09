<template>
  <div
      :style="{zIndex: props.zIndex}"
      :class="['notify', 'animate__animated', 'animate__backInDown']"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave">
    <div :class="['icon', `notify-${props.type}`]">!</div>
    <div :class="['content']">
      <div :class="['content-title']">{{ props.title }}</div>
      <div :class="['content-msg']">{{ props.msg }}</div>
    </div>
    <div :class="['close']" @click="handleClose">×</div>
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

.icon {
  position: absolute;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  left: 10px;
  top: 35px;
}

.notify-default {
  background: @info-color;
}

.notify-error {
  background: @error-color;
}

.notify-warning {
  background: @warning-color;
}

.notify-success {
  background: @success-color;
}

.notify {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 5px;
  background-color: @background-color;
  border: 1px solid @deep-background-color;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  .content {
    font-size: 14px;
    padding-left: 15px;
    color: @info-color;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    .content-title {
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      padding-left: 10px;
      font-weight: bold;
      word-break: break-all;
      -webkit-line-clamp: 1;
    }

    .content-msg {
      height: auto;
      font-size: 14px;
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
    display: inline-block;
    font-size: 22px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>