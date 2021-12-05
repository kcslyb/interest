<template>
  <div class="home">
    <div class="home-header cs-deep-background-color cs-box-shadow">
      <div class="home-header-title">
        <img class="logo cs-pointer" src="../assets/logo.png" @click="handleLogoClick"/>
        <span class="animate__animated animate__bounce animate__faster">本地存储</span>
      </div>
      <div class="header-right">
        <div class="right-opt">
          <span>{{data.userInfo.userName}}</span>
          <span @click="handleLoginOut">退出</span>
        </div>
      </div>
    </div>
    <div class="home-content">
      <router-view/>
    </div>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import CsStorage from "../storage/cs-storage";
import {reactive} from "vue";

const router = useRouter()

const data = reactive({
  userInfo: {}
})

const queryUserInfo = () => {
  CsStorage.getInstance('USERINFO').queryPage({}).then(res => {
    const temp = res.data.data || []
    if (temp.length) {
      data.userInfo = temp[0]
    }
  })
}

queryUserInfo()

const handleLogoClick = () => {
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
          white-space:nowrap;
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
    padding-top: 50px;
    text-align: center;
    box-sizing: border-box;
    overflow: auto;
  }
}

</style>