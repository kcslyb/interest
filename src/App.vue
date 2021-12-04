<template>
  <router-view/>
</template>

<script setup>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
import {shallowColor, deepenColor, getRandomColor} from "./components/lib/utils"

const initColor = () => {
  const color = getRandomColor()
  const bodyDom = document.getElementsByTagName('body')[0]
  bodyDom.style.setProperty('--sd-color', color)
  for (let i = 1; i < 10; i++) {
    const shallowColorValue = shallowColor(0.1 * i, color)
    bodyDom.style.setProperty(`--s0${i}-color`, shallowColorValue)
  }
  for (let i = 1; i < 10; i++) {
    const deepenColorValue = deepenColor(0.1 * i, color)
    bodyDom.style.setProperty(`--d0${i}-color`, deepenColorValue)
  }

}

initColor()

</script>

<style lang="less">
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @default-color;
  background-color: @background-color;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
