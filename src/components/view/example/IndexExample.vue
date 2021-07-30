<template>
  <div class="text-left">
    <cs-button-group :btn-list="btnList" @on-click="handleClick"></cs-button-group>
  </div>
</template>

<script setup>
import {routes} from "../../../route"
import CsButtonGroup from "../../package/button/src/CsButtonGroup.vue"
import {useRouter} from "vue-router";

const initMenuTree = () => {
  const children = []
  routes.forEach((value, index) => {
    if (value.meta && value.meta.label === '组件') {
      const temp = value.children || []
      temp.forEach((val, i) => {
        children.push({
          value: `menu_key_${index}_${i}}`,
          label: `${val.meta.label}API`,
          path: val.path,
          children: []
        })
      })
    }
  })
  return children
}
const btnList = initMenuTree()

const router = useRouter()

const handleClick = (item) => {
  router.push(item.path).catch(e => {
    console.error(e)
  })
}

</script>

<style scoped>

</style>