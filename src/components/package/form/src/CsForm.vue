<template>
  <div>
    <!--    <cs-form-item :item="item" v-for="(item, index) in props.items" :key="`form_item_${index}`"></cs-form-item>-->
    <div class="cs-form-item" v-for="(item, index) in props.items" :key="`form_item_${index}`">
      <div class="label"></div>
      <div class="value">
        <cs-input
            v-model="modelValue"
            :item="item"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import {defineProps, getCurrentInstance, reactive, useAttrs} from "vue";
import CsFormItem from "./CsFormItem.vue";
import { shallowReactive } from '@vue/reactivity';
import CsInput from "./items/CsInput.vue";

const attrs = useAttrs()

console.info(attrs.modelValue)

const modelValue = shallowReactive(attrs.modelValue)

const {proxy} = getCurrentInstance()
const data = reactive({
  process: {
    input: CsInput
  }
})

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: [
      {
        prop: 'text',
        label: 'input'
      }
    ]
  }
})
</script>

<style scoped>

</style>