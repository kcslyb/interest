<template>
  <div>
    <select
        :placeholder="getFormItemLabel"
        :class="['cs-input-content', {'cs-disabled': getFormDisabled}]"
        @change="handleChange">
      <option
          :class="['cs-option']"
          :label="item[optionProp.label]"
          :value="item[optionProp.value]"
          :key="index + item[optionProp.value]"
          v-for="(item, index) in options">
      </option>
    </select>
  </div>
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
  optionProp: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value'
      }
    }
  },
  options: {
    type: Array,
    default: () => {
      return [
        {label: 'java', value: 'java'},
        {label: 'linux', value: 'linux'}
      ]
    }
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

const handleChange = (e) => {
  emits('update:modelValue', e.target.value)
}

</script>

<style scoped lang="less">
.cs-input-content {
  .cs-option {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: @default-color;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
  }
}

</style>