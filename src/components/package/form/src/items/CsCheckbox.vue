<template>
  <div class="cs-checkbox">
    <div class="cs-checkbox-item" :key="`cs_checkbox_item_${index}`" v-for="(item, index) in props.options">
      <input
          type="checkbox"
          :class="[
              'checkbox',
              {
                'cs-disabled': getFormDisabled
              }
          ]"
          :id="`${random}_${index}`"
          :name="item[props.propDto.label]"
          :value="item[props.propDto.value]"
          :checked="isChecked(item)"
          @change="handleCheckboxChange"
      />
      <label
          :for="`${random}_${index}`"
          :class="{'cs-text-active': attrsData[props.prop] === item[props.propDto.value]}">
        {{ item[props.propDto.label] }}
      </label>
    </div>
  </div>
</template>
<script setup>
import {computed, defineProps, inject, useAttrs} from "vue";
import {shallowReactive} from "@vue/reactivity";
import {generateRandom, isNotEmpty, typeJudge} from "../../../../lib/utils";

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
  resultType: {
    type: String,
    default: 'string',
    validator: (value) => ['string', 'array'].includes(value)
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

const isChecked = (item) => {
  let temp = attrsData[props.prop] || ''
  if (typeJudge(temp) === 'String') {
    temp = temp.split(',')
  }
  return temp.includes(item[props.propDto.value])
}

const attrs = useAttrs()

const attrsData = shallowReactive(attrs.modelValue)

const getFormDisabled = computed(() => {
  if ((csForm && csForm.disabled)) return true
  return props.disabled
})

const random = generateRandom()

const emits = defineEmits(['update'])

const handleCheckboxChange = () => {
  const ids = []
  const names = []
  props.options.forEach((value, index) => {
    const element = document.getElementById(`${random}_${index}`)
    if (element.checked) {
      ids.push(value[props.propDto.value])
      names.push(value[props.propDto.label])
    }
  })
  const flag = props.resultType === 'string'
  const temp = {}
  temp[props.prop] = flag ? ids.join(',') : ids
  if (isNotEmpty(props.propName)) {
    temp[props.propName] = flag ? names.join(',') : names
  }
  emits('update', temp)
}
</script>

<style scoped lang="less">
.cs-checkbox {

  display: inline-block;

  .cs-checkbox-item {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .checkbox {
      padding: 0 10px;
    }
  }

}

</style>