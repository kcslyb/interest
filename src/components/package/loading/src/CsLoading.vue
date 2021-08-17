<template>
  <cs-dialog :show="props.show" :body-style="bodyStyle">
    <template v-slot:body>
      <div class="content">
        <div class="content-circular"></div>
        <p v-if="props.text" class="content-text">{{ props.text }}</p>
      </div>
    </template>
  </cs-dialog>
</template>

<script setup>
import CsDialog from '../../dialog/src/CsDialog.vue'
const bodyStyle = {
  width: 'auto',
  height: '0'
}
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="less">
.content {
  display: flex;
  justify-content: center;
  align-items: center;

  .content-text {
    display: inline-block;
    color: white;

    &:after {
      content: '...';
    }
  }

  .content-circular {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 20px;
    border: 2px none white;
    border-right-style: solid;
    border-left: solid @default-color;
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    75% {
      -webkit-transform: rotate(270deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>