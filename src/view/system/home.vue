<template>
  <div class="cs-container">
    <div class="cs-padding-top20">
      <cs-label label="页面配置项">
        <template v-slot:right>
          <cs-button span type="primary">添加页面</cs-button>
        </template>
      </cs-label>
    </div>
    <div class="cs-grid-content cs-content-box cs-no-scrollbar">
      <div class="cs-card" v-for="item of 46">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
import CsLabel from '../../components/package/label/src/CsLabel.vue'
import CsButton from '../../components/package/button/src/CsButton.vue'

</script>

<style scoped lang="less">
.cs-container {

  .cs-grid-content {

    .cs-card {
      padding: 10px;
      height: 88px;
      display: inline-block;
      border: 1px solid @primary-color;
    }
  }
}
</style>