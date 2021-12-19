<template>
  <div class="code-container">
    <div class="title">
      <span v-show="!show" class="btn" @click="show = !show">显示代码</span>
      <span v-show="show" class="btn" @click="show = !show">隐藏代码</span>
    </div>
    <div class="ql-container ql-snow ql-disabled" v-show="show">
      <div class="ql-editor" data-gramm="false" contenteditable="false" data-placeholder="请输入">
        <div class="ql-syntax code" spellcheck="false">
        {{content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeContainer",
  props: {
    content: {
      type: String,
      default: `this code detail`
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped lang="less">
.code-container {
  font-size: 14px;
  text-align: left;
  border-radius: 2px;
  color: @deep-border-color;
  list-style-position: outside;
  border: 1px solid @border-color;

  .title {
    padding: 10px 0;
    text-align: right;
    border: 1px solid #ccc;
    .btn {
      padding-right: 15px;
      cursor: pointer;

      &:hover {
        color: @cs-d08-color;
      }
    }
  }

  .code {
    font-size: 14px;
    font-family: Menlo,Monaco,Consolas,Courier,monospace;
  }
}
</style>