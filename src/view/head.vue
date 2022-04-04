<template>
  <div class="home">
    <div class="home-header cs-deep-background-color cs-box-shadow">
      <div class="home-header-title">
        <img class="logo cs-pointer" src="../assets/logo.png" @click="handleLogoClick"/>
        <div class="menu-tab">
          <span
              class="menu-tab-item"
              v-for="(item, index) in currentRoute.meta.tags"
              :key="`menu_${index}`">
            {{ item }}
          </span>
        </div>
      </div>
      <div class="header-right">
        <div class="right-opt">
          <span>{{ data.userInfo.userName }}</span>
          <span @click="handleLoginOut">退出</span>
        </div>
      </div>
    </div>
    <div class="home-content">
      <div :class="['home-content-aside', `${data.collapse ? 'aside-collapse' : 'aside-noCollapse'}`]">
        <div class="collapse" @click="handleCollapseClick">{{ `${data.collapse ? '>' : '<'}` }}</div>
        <system-menu v-show="!data.collapse"/>
      </div>
      <div class="home-content-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import SystemMenu from "./system/menu.vue"
import {useRouter} from "vue-router";
import CsStorage from "../storage/cs-storage";
import {computed, reactive} from "vue";
import {mapActions, mapGetters, mapMutations, useStore} from "vuex";
import {QUERY_ACCOUNT, QUERY_CURRENT_ROUTER, QUERY_ROUTER, SET_ACCOUNT} from "../store/mutation-types"
import getStateServer from "../state/state-serve";

const state = useStore()
const router = useRouter()

const data = reactive({
  userInfo: {},
  collapse: false
})

mapActions([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].call({$store: state})
const currentRoute = computed(mapGetters([`router/${QUERY_CURRENT_ROUTER}`])[`router/${QUERY_CURRENT_ROUTER}`]
    .bind({$store: state})) || []

data.userInfo = computed(mapGetters([`account/${QUERY_ACCOUNT}`])[`account/${QUERY_ACCOUNT}`]
    .bind({$store: state})) || []


const handleLogoClick = () => {
  getStateServer('LogStateServe').commitSimpleLog('点击LOGO进入彩蛋')
  mapMutations([`account/${SET_ACCOUNT}`])[`account/${SET_ACCOUNT}`].call({$store: state}, {})
  router.push('/').catch(e => console.error(e))
}

const handleLoginOut = () => {
  CsStorage.getInstance('USERINFO').deleteAll().then(() => {
    getStateServer('LogStateServe').commitSimpleLog('退出操作')
    mapMutations([`account/${SET_ACCOUNT}`])[`account/${SET_ACCOUNT}`].call({$store: state}, {})
    router.push('/').catch(e => console.error(e))
  })
}

const handleCollapseClick = () => {
  data.collapse = !data.collapse
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

      .menu-tab {
        :last-child {
          &::after {
            content: none !important;
          }
        }

        .menu-tab-item {
          display: inline-block;
          font-weight: bold;
          font-size: 16px;
          line-height: 50px;
          color: @default-color;
          padding-left: 10px;

          &::after {
            content: ' ';
            margin-left: 10px;
            padding-right: 3px;
            background-color: @cs-d03-color;
          }
        }
      }

    }

    .header-right {
      display: inline-block;
      padding-right: 20px;

      .right-opt {
        display: flex;
        align-items: center;

        :first-child {
          &::before {
            content: none !important;
          }
        }

        & span {
          width: auto;
          padding-left: 20px;
          display: inline-block;
          white-space: nowrap;
          cursor: pointer;

          &::before {
            content: ' ';
            margin-right: 20px;
            padding-right: 3px;
            background-color: @cs-d03-color;
          }

          &:hover {
            font-weight: bold;
            color: @default-active-color;
          }
        }
      }
    }
  }

  .home-content {
    width: 100%;
    height: 100%;
    padding-top: 50px;
    display: inline-flex;
    box-sizing: border-box;
    overflow: hidden;

    .aside-noCollapse {
      width: 33%;
      min-width: 200px;
      max-width: 300px;
    }

    .aside-collapse {
      width: 14px;
      overflow: hidden;
    }

    .home-content-aside {
      height: 100%;
      overflow: auto;
      display: inline-block;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      position: relative;

      .collapse {
        position: absolute;
        right: 0;
        top: 50%;
        padding: 5px 4px;
        font-size: 18px;
        line-height: 28px;
        cursor: pointer;
        border-radius: 4px;
        width: 4px;
        overflow: hidden;
        background-color: @deep-background-color;

        &:hover {
          width: auto;
        }
      }
    }

    .home-content-right {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: inline-block;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
}

@keyframes changeCollapseWidth {
  from {
    width: 5px;
  }
  to {
    width: 30px;
  }
}

</style>