<template>
  <div class="home">
    <div class="home-header cs-border-bottom">
      <div class="home-header-title">
        <img class="logo cs-pointer" src="../assets/logo.png" @click="handleLogoClick"/>
        <span class="animate__animated animate__bounce animate__faster">组件文档</span>
      </div>
    </div>
    <div class="home-content">
      <div class="home-content-aside">
        <cs-list :prop-obj="propObj" :options="menus" @click-item="handleClickItem"></cs-list>
      </div>
      <div class="home-content-right cs-scrollbar">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useRouter} from "vue-router"
import CsLabel from '../components/package/label/src/CsLabel.vue'
import CsList from "../components/package/list/src/CsList.vue"
import {routes} from "../route";

const state = useStore()
import {mapActions, mapGetters, useStore} from "vuex";
import {QUERY_ROUTER} from "../store/mutation-types";

mapActions([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].call({$store: state})
const routers = computed(mapGetters([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].bind({$store: state}))
const menus = routers.value.filter(value => value.name === 'components')
const propObj = {
  value: 'name',
  label: 'meta.label',
  children: 'children'
}

const router = useRouter()
const handleClickItem = (item) => {
  router.push(item.path)
}

const handleLogoClick = () => {
  router.push('/')
}

</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;

  .home-header {
    position: fixed;
    z-index: 50;
    top: 0;
    height: 50px;
    width: 1140px;
    display: inline-block;

    .home-header-title {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      line-height: 50px;
      color: @default-color;
      background-color: @background-color;
      display: flex;
      align-items: center;

      .logo {
        height: 50px;
        background-color: transparent;
      }

      & span {
        display: inline-block;
      }
    }
  }

  .home-content {
    height: 100%;
    width: 1140px;
    padding-top: 20px;
    display: inline-flex;
    box-sizing: border-box;
    overflow-y: hidden;

    .home-content-aside {
      height: 100%;
      padding-top: 50px;
      display: inline-block;
      box-sizing: border-box;
      width: 20%;
    }

    .home-content-right {
      height: 100%;
      width: 80%;
      padding-top: 50px;
      display: inline-block;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
}


</style>