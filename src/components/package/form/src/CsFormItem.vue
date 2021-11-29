<template>
  <div class="cs-form-item">
    <div :class="[
        'form-item-label',
        {'cs-require': props.required}
        ]"
         :style="{width: getFormLabelWidth}">
      {{ getLabel }}
    </div>
    <div class="form-item-content">
      <div :class="['form-item-value', {'form-item-content_error': getShowError}]">
        <slot></slot>
      </div>
      <span class="form-item__error error" v-show="getShowError">{{ getErrorLabel }}</span>
    </div>
  </div>
</template>
<script setup>

import {computed, defineProps, inject, provide, getCurrentInstance, useAttrs} from "vue";
import {isEmpty} from "../../../lib/utils";
import {shallowReactive} from "@vue/reactivity";

const props = defineProps({
  prop: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'input'
  },
  required: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: String,
    default: ''
  },
  errorMsg: {
    type: String,
    default: ''
  },
  validate: {
    type: Boolean,
    default: false
  }
})

const attrs = useAttrs()

const attrsData = shallowReactive(attrs.modelValue)

const {proxy} = getCurrentInstance()

provide('csFormItem', proxy)

const csForm = inject('csForm')

const getLabel = computed(() => {
  return props.label || ''
})

const getErrorLabel = computed(() => {
  const types = ['input', 'textarea']
  const text = types.includes(props.type) ? '请输入' : '请选择'
  return props.errorMsg || `${text}${props.label}`
})

const getShowError = computed(() => {
  const value = attrsData ? attrsData[props.prop] : csForm.modelValue[props.prop]
  return props.required && isEmpty(value) && props.validate
})

const getFormLabelWidth = computed(() => {
  return props.labelWidth || ''
})

</script>

<style scoped lang="less">
.form-item-content {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-item__error {
  position: absolute;
  line-height: 1;
  padding-top: 4px;
  top: 100%;
}

</style>