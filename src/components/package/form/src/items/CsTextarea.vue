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
      :value="attrs.modelValue"
      @input="handleInput"
  />
</template>

<script setup>
import {computed, defineProps, inject, useAttrs} from "vue";
import {isEmpty} from "../../../../lib/utils";

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

const emits = defineEmits(['update:modelValue'])

const handleInput = (e) => {
  emits('update:modelValue', e.target.value)
}

</script>

<style scoped>

</style>