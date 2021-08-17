<template>
  <div class="cs-form-item">
    <div class="label"></div>
    <div class="value">
      <cs-input :attrs="$attrs.value[props.item.name]" @onUpdate="$emit('onUpdate:modelValue', $event.target.value)"/>
    </div>
  </div>
</template>
<script setup>
import CsInput from "./items/CsInput.vue";
const process = {
  input: CsInput
}

import {defineProps, ref} from "vue";

const textValue = ref('')

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: {label: 'input'}
  }
})
</script>

<style scoped>

</style>