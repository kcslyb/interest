<template>
  <div class="home">
    <div class="home-header cs-border-bottom">
      <div class="home-header-title"><span>cs components</span></div>
    </div>
    <div class="home-content">
      <div class="home-content-aside">
        <cs-tree
            :options="menus"
            :current-item="currentItem"
            @click-node="handleClickNode"
        ></cs-tree>
      </div>
      <div class="home-content-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useRouter} from "vue-router"
import CsTree from "../components/package/tree/src/CsTree.vue";
import CsLabel from '../components/package/label/src/CsLabel.vue'
import {routes} from "../route";

const initMenuTree = () => {
  const menus = []
  routes.forEach((value, index) => {
    if (value.meta) {
      const children = []
      const temp = value.children || []
      temp.forEach((val, i) => {
        children.push({
          value: `menu_key_${index}_${i}}`,
          label: val.meta.label,
          path: val.path,
          children: []
        })
      })
      const findIndex = menus.findIndex(v => v.label === value.meta.label)
      if (findIndex > -1) {
        menus[findIndex].children = menus[findIndex].children.concat(children)
      } else {
        menus.push({
          value: `menu_key_${index}`,
          label: value.meta.label,
          path: value.path,
          children: children
        })
      }
    }
  })
  return menus
}

const menus = initMenuTree()

const currentItem = reactive({})

const router = useRouter()
const handleClickNode = (item) => {
  Object.assign(currentItem, item)
  router.push(item.path)
}

</script>

<style scoped lang="less">
.home {
  height: 100%;
  text-align: center;

  .home-header {
    height: 50px;
    width: 1140px;
    display: inline-block;

    .home-header-title {
      text-align: left;
      font-weight: bold;
      font-size: 26px;
      line-height: 50px;
    }
  }

  .home-content {
    height: 100%;
    width: 1140px;
    padding-top: 20px;
    display: inline-block;
    box-sizing: border-box;

    .home-content-aside {
      display: inline-block;
      width: 18%;
    }

    .home-content-right {
      width: 82%;
      height: 100%;
      display: inline-block;
      float: right;
    }
  }
}


</style>