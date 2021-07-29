<template>
  <div>
    <cs-label label="基础用法"></cs-label>
    <div class="text-left">
      <cs-button span>基本</cs-button>
      <cs-button span type="text">文本</cs-button>
      <cs-button span type="primary">主要</cs-button>
      <cs-button type="warning">警告</cs-button>
    </div>
    <cs-label label="禁用"></cs-label>
    <div class="text-left">
      <cs-button disabled type="text">文本</cs-button>
    </div>
    <cs-label label="按钮组"></cs-label>
    <div class="text-left">
      <cs-button-group :btn-list="btnList"></cs-button-group>
    </div>
  </div>
</template>

<script setup>
import CsLabel from '../../package/label/src/CsLabel.vue'
import CsButton from '../../package/button/src/CsButton.vue'
import CsButtonGroup from "../../package/button/src/CsButtonGroup.vue"
import {reactive} from "vue";
const btnList = reactive([
  {
    type: 'info',
    label: 'info'
  }, {
    type: 'text',
    label: 'text'
  }
])
</script>

<style scoped>

</style>
