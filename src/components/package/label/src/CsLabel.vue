<template>
  <div
      :class="{'cs-label': true, 'cs-label-bottom': showUnderLine}">
    <div :class="{'cs-label-container': slots.right}">
      <div :class="[`text-${textAlign}`]">
        <div class="label-icon-container">
          <slot name="icon">
            <span v-if="slots.icon || showIcon" class="label-icon discount"></span>
          </slot>
          <div class="label-content">
            <span :class="['cs-label-text']">{{ label }}</span>
          </div>
        </div>
      </div>
      <slot name="right"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, useSlots} from 'vue'

defineProps({
  label: String,
  showIcon: {
    type: Boolean,
    default: true
  },
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
  height: auto;
  padding: 5px 0;
  font-weight: bold;
  margin-bottom: 20px;
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

.label-icon-container {
  width: 100%;
  display: inline-flex;
  align-items: center;

  .label-content {
    margin-left: 10px;
    flex-grow: 1;
  }
}

.label-icon {
  height: 6px;
  position: relative;
  text-align: center;
  margin-right: 5px;

  &:after {
    position: absolute;
    content: "";
    left: 0;
    top: -50%;
    height: 6px;
    border-style: solid;
    border-width: 3px;
  }
}

.label-icon.discount {
  &:after {
    border-color: @default-color @default-color transparent @default-color;
  }
}

.label-icon.discount {
  background: @default-color;
}

.cs-label-bottom {
  border-bottom: 1px solid @border-color;
}

.cs-label-text {
  font-size: 14px;
  line-height: 28px;
  color: @default-color;
  transform: translateY(-8px);
}

.cs-label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>