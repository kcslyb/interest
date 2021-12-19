<template>
  <input
      :class="[
          'cs-input-content',
          {
            'cs-disabled': getFormDisabled
          }
      ]"
      :type="getInputType"
      :placeholder="getFormItemLabel"
      :value="attrs.modelValue"
      @input="handleInput"
  />
</template>

<script setup>
import {computed, defineProps, inject, useAttrs} from "vue";
import {isEmpty} from "../../../../lib/utils";

const csForm = inject('csForm')
const csFormItem = inject('csFormItem')

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputType: {
    type: String,
    default: 'input'
  }
})

const attrs = useAttrs()

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

const getInputType = computed(() => {
  return props.inputType
})

const emits = defineEmits(['update:modelValue'])

const handleInput = (e) => {
  emits('update:modelValue', e.target.value)
}

</script>

<style scoped>

</style>