<template>
  <div
      :class="[
          'cs-label',
          `text-${textAlign}`,
           {'cs-label-bottom': showUnderLine}
           ]">
    <div :class="{'cs-label-container': slots.right}">
      <span :class="['cs-label-text']">{{ label }}</span>
      <slot name="right"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, useSlots} from 'vue'

defineProps({
  label: String,
  showUnderLine: Boolean,
  textAlign: {
    type: String,
    default: 'left'
  }
})

const slots = useSlots()

</script>

<style scoped lang="less">
.cs-label {
  height: 28px;
  padding: 0 5px;
  font-weight: bold;
}

.cs-label:before {
  content: '';
  width: 100%;
  position: absolute;
  bottom: -1px;
  left: 0;
  background-color: @border-color;
  border-radius: 4px;
}

.cs-label-bottom {
  border-bottom: 1px solid @border-color;
}

.cs-label-text {
  font-size: 14px;
  line-height: 28px;
}

.cs-label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>