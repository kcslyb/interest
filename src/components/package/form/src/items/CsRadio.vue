<template>
  <div class="cs-radio">
    <div class="cs-radio-item" :key="`cs_radio_item_${index}`" v-for="(item, index) in props.options">
      <input
          type="radio"
          :class="[
              'radio',
              'cs-input-content',
              {
                'cs-disabled': getFormDisabled
              }
          ]"
          :name="radioName"
          :id="`${radioName}_${index}`"
          :value="item[props.propDto.value]"
          :checked="attrsData[props.prop] === item[props.propDto.value]"
          @input="handleRadioInput"
      />
      <label
          :for="`${radioName}_${index}`"
          :class="{'cs-text-active': attrsData[props.prop] === item[props.propDto.value]}">
          {{ item[props.propDto.label] }}
      </label>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, inject, useAttrs} from "vue";
import {shallowReactive} from "@vue/reactivity";
import {arrayToMap, generateRandom, isNotEmpty} from "../../../../lib/utils";

const csForm = inject('csForm')
const csFormItem = inject('csFormItem')

const props = defineProps({
  prop: {
    type: String,
    required: true
  },
  propName: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  propDto: {
    type: Object,
    default: () => {
      return {
        value: 'value',
        label: 'label'
      }
    }
  },
  options: {
    type: Array,
    default: () => {
      return [
        {value: '1', label: '是'},
        {value: '0', label: '否'}
      ]
    }
  }
})

const attrs = useAttrs()

const attrsData = shallowReactive(attrs.modelValue)

const getFormDisabled = computed(() => {
  if ((csForm && csForm.disabled)) return true
  return props.disabled
})

const radioName = generateRandom()

const optionMap = arrayToMap(props.options, {key: props.propDto.value, value: props.propDto.label})

const emits = defineEmits(['update'])

const handleRadioInput = (checked) => {
  const temp = {}
  temp[props.prop] = checked.target.value
  if (isNotEmpty(props.propName)) {
    temp[props.propName] = optionMap.get(temp[props.prop])
  }
  emits('update', temp)
}
</script>

<style scoped lang="less">
.cs-radio {

  display: inline-block;

  .cs-radio-item {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .radio {
      padding: 0 10px;
    }
  }

}

</style>