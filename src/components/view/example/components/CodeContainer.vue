<template>
  <div class="code-container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "CodeContainer"
}
</script>

<style scoped lang="less">
.code-container {
  font-size: 14px;
  text-align: left;
  padding: 5px 10px;
  border-radius: 2px;
  color: @deep-border-color;
  list-style-position: outside;
  border: 1px solid @deep-border-color;
}
</style>