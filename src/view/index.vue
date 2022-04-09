<template>
  <div class="box-container">
    <div class="bg-blur"></div>
    <div :class="['container', hasMobile ? 'm-container' : 'p-container']">
      <slot name="content">
        <div class="content">
          <div class="title custom-font">项目彩蛋</div>
          <div class="content">
            <div
                class="link custom-font"
                v-for="(link, index) of links"
                :key="`link_${index}`"
                @click="handleClick(link)">
              {{ link.label }}
            </div>
          </div>
          <div class="footer">
            <div v-if="!accountInfo.id" class="custom-font" @click.stop="handleToLogin">登录\注册（本地系统）</div>
            <div v-else class="custom-font" @click.stop="handleToHome">进入本地系统</div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import CsDialog from "../components/package/dialog/src/CsDialog.vue"
import {useRouter} from "vue-router"
import {computed, getCurrentInstance} from "vue";
import {mapGetters, useStore} from "vuex";
import {QUERY_ACCOUNT} from "../store/mutation-types";
import {isMobile} from "../components/lib/utils";

const state = useStore()
const router = useRouter()

const links = [
  {label: '本项目组件文档(vue3 语法学习)',  path: '/components/IndexExample'},
  {label: 'js工具方法总结记录', path: 'https://juejin.cn/post/6966109855086018591', href: true},
  {label: '本项目源码地址', path: 'https://github.com/kcslyb/interest',  href: true}
]
const handleToLogin = () => {
  router.push('/login').catch(e => console.error(e))
}
const handleToHome = () => {
  router.push('/interest/home').catch(e => console.error(e))
}

const handleClick = (item) => {
  if(item.href) {
    window.open(item.path)
  } else {
    router.push(item.path).catch(e => console.error(e))
  }
}

const hasMobile = computed(() => {
  return isMobile()
})

const accountInfo = computed(mapGetters([`account/${QUERY_ACCOUNT}`])[`account/${QUERY_ACCOUNT}`]
    .bind({$store: state})) || []

</script>

<style scoped lang="less">
.box-container {
  width: 100%;
  height: 100%;

  .bg-blur {
    width: 100%;
    height: 100%;
    background: url("https://w.wallhaven.cc/full/ne/wallhaven-nedq9k.jpg") no-repeat center;
    background-size: cover;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(15px);
  }

  .book {
    position: absolute;
    width: 20px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }

  .m-container {
    left: 50%;
    top: 46%;
    width: 100%;
  }

  .p-container {
    left: 33%;
    top: 46%;
    width: 520px;
    padding: 20px;
  }

  .container {
    position: absolute;
    height: 260px;
    border-radius: 8px;
    color: @white-color;
    box-shadow: 0 2px 4px 0 #a6c4d7;
    //background-color: rgb(84 137 171 / 60%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    background: url("https://w.wallhaven.cc/full/ne/wallhaven-nedq9k.jpg") no-repeat center;
    background-size: cover;

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
      }

      .content {
        flex: auto;
        padding: 0 5%;

        .link {
          margin-bottom: 5px;
          padding-bottom: 5px;
          border-bottom: 1px solid;
          font-size: 16px;
          cursor: pointer;
          text-align: left;

          &:hover {
            font-weight: bold;
          }
        }
      }

      .footer {
        font-size: 14px;
        font-weight: bold;
        text-align: right;
        cursor: pointer;
      }
    }
  }
}
</style>