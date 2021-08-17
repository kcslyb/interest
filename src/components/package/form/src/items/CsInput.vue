<template>
<input
    v-model="$attrs.modelValue[props.item.prop]"
/>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

</style>