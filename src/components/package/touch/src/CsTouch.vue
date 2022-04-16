<template>
  <div
      class="cs-touch"
      @mousedown="handleMousedown"
      @mouseup="handleMouseup"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd">
    <slot/>
  </div>
</template>

<script setup>

import {reactive, defineEmits} from "vue"

const data = reactive({
  startDistanceX: 0,
  startDistanceY: 0,
  endDistanceX: 0,
  endDistanceY: 0,
  moveDistanceX: 0,
  moveDistanceY: 0
})

const events = ['touch-left', 'touch-right', 'touch-top', 'touch-bottom']
const emits = defineEmits(['touch', 'touch-left', 'touch-right', 'touch-top', 'touch-bottom'])

const handleTouchStart = (e) => {
  data.startDistanceX = e.touches[0].screenX
  data.startDistanceY = e.touches[0].screenY
}

const handleTouchEnd = (e) => {
  data.endDistanceX = e.changedTouches[0].screenX
  data.endDistanceY = e.changedTouches[0].screenY
  data.moveDistanceX = data.startDistanceX - data.endDistanceX
  data.moveDistanceY = data.startDistanceY - data.endDistanceY
  if ((Math.abs(data.moveDistanceX) > 40 || Math.abs(data.moveDistanceY) > 40)) {
    if (Math.abs(data.moveDistanceX) > Math.abs(data.moveDistanceY)) {
      const event = data.moveDistanceX > 0 ? events[0] : events[1]
      emits('touch', {event, e})
      emits(event, e)
    } else {
      const event = data.moveDistanceY > 0 ? events[2] : events[3]
      emits('touch', {event, e})
      emits(event, e)
    }
  }
}

const handleMousedown = (e) => {
  const params = {
    touches: [
      {
        screenX: e.pageX,
        screenY: e.pageY
      }
    ]
  }
  handleTouchStart(params)
}
const handleMouseup = (e) => {
  const params = {
    changedTouches: [
      {
        screenX: e.pageX,
        screenY: e.pageY
      }
    ]
  }
  handleTouchEnd(params)
}


</script>

<style scoped>
.cs-touch {
  width: auto;
  height: auto;
  display: inline-block;
}
</style>