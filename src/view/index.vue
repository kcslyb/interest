<template>
  <div class="box-container">
    <div class="bg-blur"></div>
    <div class="container">
      <slot name="content">
        <div class="content">
          <div class="title custom-font">个人学习页签</div>
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
            <div v-if="!accountInfo.id" class="custom-font" @click.stop="handleToLogin">登录\注册（本地存储系统）</div>
            <div v-else class="custom-font" @click.stop="handleToHome">进入本地存储系统</div>
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

const state = useStore()
const router = useRouter()

const links = [
  {label: '从组件学习vue3',  path: '/components/IndexExample'},
  {label: 'js常用工具方法总结', path: '/components/IndexExample'}
]
const handleToLogin = () => {
  router.push('/login').catch(e => console.error(e))
}
const handleToHome = () => {
  router.push('/interest/home').catch(e => console.error(e))
}

const handleClick = (item) => {
  router.push(item.path).catch(e => console.error(e))
}

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

  .container {
    position: absolute;
    left: 33%;
    top: 46%;
    width: 520px;
    height: 260px;
    padding: 20px;
    border-radius: 8px;
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