<template>
  <div>
    <div class="margin-bottom">
      <cs-label label="标签组件"></cs-label>
    </div>
    <eg-container></eg-container>
    <eg-container
        label="插槽(slot)"
        :data="slotData"
        :columns="slotColumns">
    </eg-container>
    <eg-container>
      <cs-label class="margin-bottom" label="示例"></cs-label>
      <cs-label class="margin-bottom" :show-icon="false" text-align="center" label="不显示前缀且居中"></cs-label>
      <cs-label class="margin-bottom" :show-under-line="true" label="显示下划线"></cs-label>
      <cs-label class="margin-bottom" :show-under-line="true" label="使用插槽(right)">
        <template v-slot:right>
          SLOT-RIGHT
        </template>
      </cs-label>
    </eg-container>
  </div>
</template>

<script setup>
import CsLabel from '../../package/label/src/CsLabel.vue'
import CsTable from '../../package/table/src/CsTable.vue'
import EgContainer from "./components/EgContainer.vue"
const slotColumns = [
  {label: 'name', prop: 'name'},
  {label: '说明', prop: 'description'},
]
const slotData = [
  {
    name: 'icon',
    description: '可自定义标签名称前缀',
  }, {
    name: 'right',
    description: '可在标签右侧添加相应内容',
  }
]
</script>

<style scoped>
</style>
