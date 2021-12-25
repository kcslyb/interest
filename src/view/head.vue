<template>
  <div class="home">
    <div class="home-header cs-deep-background-color cs-box-shadow">
      <div class="home-header-title">
        <img class="logo cs-pointer" src="../assets/logo.png" @click="handleLogoClick"/>
        <span class="animate__animated animate__bounce animate__faster">{{currentRoute.meta.tags.join('>')}}</span>
      </div>
      <div class="header-right">
        <div class="right-opt">
          <span>{{ data.userInfo.userName }}</span>
          <span @click="handleLoginOut">退出</span>
        </div>
      </div>
    </div>
    <system-menu/>
    <div class="home-content">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import SystemMenu from "./system/menu.vue"
import {useRouter} from "vue-router";
import CsStorage from "../storage/cs-storage";
import {computed, reactive} from "vue";
import {mapActions, mapGetters, mapMutations, useStore} from "vuex";
import {QUERY_ACCOUNT, QUERY_CURRENT_ROUTER, QUERY_ROUTER, SET_ACCOUNT} from "../store/mutation-types";

const state = useStore()
const router = useRouter()

const data = reactive({
  userInfo: {}
})

mapActions([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].call({$store: state})
const currentRoute = computed(mapGetters([`router/${QUERY_CURRENT_ROUTER}`])[`router/${QUERY_CURRENT_ROUTER}`]
    .bind({$store: state})) || []

data.userInfo = computed(mapGetters([`account/${QUERY_ACCOUNT}`])[`account/${QUERY_ACCOUNT}`]
    .bind({$store: state})) || []


const handleLogoClick = () => {
  mapMutations([`account/${SET_ACCOUNT}`])[`account/${SET_ACCOUNT}`].call({$store: state}, {})
  router.push('/').catch(e => console.error(e))
}

const handleLoginOut = () => {
  CsStorage.getInstance('USERINFO').deleteAll().then(() => {
    handleLogoClick()
  })
}

</script>

<style scoped lang="less">

.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .home-header {
    position: fixed;
    z-index: 50;
    top: 0;
    height: 50px;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    .home-header-title {
      height: 50px;
      width: 100%;
      display: inline-flex;
      align-items: center;

      .logo {
        height: 50px;
      }

      & span {
        display: inline-block;
        font-weight: bold;
        font-size: 16px;
        line-height: 50px;
        color: @default-color;
      }
    }

    .header-right {
      display: inline-block;
      padding-right: 20px;

      .right-opt {
        display: flex;
        align-items: center;

        & span {
          width: auto;
          padding-left: 20px;
          display: inline-block;
          white-space: nowrap;
          cursor: pointer;

          &:hover {
            color: @active-color;
          }
        }
      }
    }
  }

  .home-content {
    width: 100%;
    height: 100%;
    padding-top: 50px;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
  }
}

</style>