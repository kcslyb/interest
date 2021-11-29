<template>
  <textarea
      :rows="props.rows"
      :class="[
          'cs-input-content',
          {
            'cs-disabled': getFormDisabled
          }
      ]"
      :placeholder="getFormItemLabel"
      v-model="attrsData"
  />
</template>

<script setup>
import {computed, defineProps, inject, useAttrs} from "vue";
import {shallowReactive} from "@vue/reactivity";
import {hasNotProperty, isEmpty} from "../../../../lib/utils";

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 1
  }
})

const attrs = useAttrs()

const attrsData = shallowReactive(attrs.modelValue)

const csForm = inject('csForm')
const csFormItem = inject('csFormItem')

const getFormDisabled = computed(() => {
  if (props.disabled) {
    return props.disabled
  } else {
    return csForm && csForm && csForm.disabled
  }
})

const getFormItemLabel = computed(() => {
  if (getFormDisabled) {
    return ''
  }
  if (isEmpty(props.placeholder)) {
    return `请输入${csFormItem && csFormItem.getLabel}`
  }
  return props.placeholder
})

</script>

<style scoped>

</style>