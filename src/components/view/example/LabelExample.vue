<template>
  <div>
    <cs-label label="基础用法"></cs-label>
    <code-container>
      {{toText('<cs-label label="基础用法"></cs-label>')}}
    </code-container>
    <cs-label text-align="center" label="居中显示"></cs-label>
    <code-container>
      {{toText('<cs-label text-align="center" label="居中显示"></cs-label>')}}
    </code-container>
    <cs-label text-align="right"  label="靠右显示"></cs-label>
    <code-container>
      {{toText('<cs-label text-align="right"  label="靠右显示"></cs-label>')}}
    </code-container>
    <cs-label show-under-line label="显示下划线"></cs-label>
    <code-container>
      {{toText('<cs-label show-under-line label="显示下划线"></cs-label>')}}
    </code-container>
    <cs-label label="插槽加按钮">
      <template v-slot:right>
        <span>v-slot:right</span>
      </template>
    </cs-label>
    <code-container>
      {{toText('<cs-label label="插槽加按钮"> <template v-slot:right> <span>v-slot:right</span> </template> </cs-label>')}}
    </code-container>
  </div>
</template>

<script setup>
import CsLabel from '../../package/label/src/CsLabel.vue'
import CodeContainer from "./components/CodeContainer.vue"
const toText = (html) => {
  return String(html)
}
</script>

<style scoped>
</style>
