<template>
  <div>
    <cs-button
        :type="item.type || 'info'"
        :disabled="item.disabled"
        :key="`btn_group_${index}`"
        v-for="(item, index) of btnList"
        @on-click="handleClick(item)">
      {{item.label}}
    </cs-button>
  </div>
</template>

<script setup>
import CsButton from './CsButton.vue'
import {defineProps} from "vue"

const props = defineProps({
  btnList: {
    type: Array,
    default: () => {
      return [
        {
          type: 'info',
          label: 'info'
        }, {
          type: 'primary',
          label: 'primary'
        }, {
          type: 'success',
          label: 'success'
        }, {
          type: 'warning',
          label: 'warning'
        }, {
          type: 'error',
          label: 'error'
        }
      ]
    }
  }
})
const span = (index) => {
  return index < props.btnList.length - 1
}

const emits = defineEmits(['on-click'])
const handleClick = (item) => {
  emits('on-click', item)
}
</script>

<style scoped>

</style>