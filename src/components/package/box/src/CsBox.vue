<template>
  <div class="box">
    <p class="animate" :style="animationStyle">
      {{ text }}
    </p>
  </div>
</template>

<script setup>

import {computed, defineProps} from "vue"

const props = defineProps({
  time: {
    type: Number,
    default: 10
  },
  text: {
    type: String,
    default: '不做数据收集，数据都存储于localStorage中。'
  },
  style: {
    type: Object,
    default: () => {
      return {
        color: 'white',
        fontSize: '12px',
      }
    }
  }
})

const animationStyle = computed(() => {
  const animation = `
  animation-duration:${props.time}s;
  -webkit-animation-duration:${props.time}s;
  `
  return Object.keys(props.style).reduce((acc, cur) => {
    if (props.style[cur]) {
      const key = cur.replace(/([A-Z]+)/g, '-$1').toLowerCase()
      acc = `${acc} ${key}: ${props.style[cur]};`
    }
    return acc
  }, animation)
})

</script>

<style scoped lang="less">
.box {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  text-align: left;
}


.animate {
  text-align: left;
  white-space: nowrap;
  display: inline-block;
  animation-name: wordsLoop;
  animation-iteration-count: infinite;
  -webkit-animation-name: wordsLoop;
  -webkit-animation-iteration-count: infinite;

  &:hover {
    animation-play-state: paused;
  }
}


@keyframes wordsLoop {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}


@-webkit-keyframes wordsLoop {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}
</style>