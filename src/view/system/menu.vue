<template>
  <div class="menu">
    <div class="menu-line" v-show="show"></div>
    <div class="menu-content" v-show="show">
      <div
          class="menu-content-item"
          :key="`menu_item_${index}`"
          v-for="(router, index) in routers">
        <div
            class="menu-item menu-item-parent"
            @click="handleRouterClick(router)">
          {{ router.meta.label }}
        </div>
        <div
            class="menu-item menu-item-sub"
            :key="`menu_item_${index}`"
            v-for="(sub, index) in router.children"
            @click="handleRouterClick(sub)">
          {{ sub.meta.label }}
        </div>
      </div>
    </div>
    <div class="menu-line-end" v-show="show"></div>
    <div class="menu-switch" @click="show = !show">菜单</div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {mapGetters, useStore} from "vuex";
import {QUERY_ROUTER, SET_CURRENT_ROUTER} from "../../store/mutation-types";
import {useRouter} from "vue-router";

const state = useStore()
const router = useRouter()

const show = ref(false)

const routers = computed(mapGetters([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].bind({$store: state}))

const handleRouterClick = (menu) => {
  if (!menu.meta.next) {
    state.commit(`router/${SET_CURRENT_ROUTER}`, menu)
    router.push(menu.meta.path).catch(() => {
    })
  }
}

</script>

<style scoped lang="less">
@keyframes menuFrames {
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(270deg);
  }
  75% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

.menu {
  .menu-content-item {
    margin-bottom: 10px;
  }

  .menu-line {
    height: 50px;
    position: absolute;
    right: 60px;
    top: 50px;
    border-right: 1px solid @default-color;
  }
  .menu-line-end {
    height: 50px;
    position: absolute;
    right: 60px;
    bottom: 40px;
    border-right: 1px solid @default-color;
  }

  .menu-content {
    position: absolute;
    right: 10px;
    top: 100px;
    width: 100px;
    height: calc(100% - 190px);
    animation: menuFrames 5s infinite linear;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    &:hover {
      animation: none;
    }

    .menu-item {
      padding: 10px 10px;
      font-size: 14px;
      text-align: left;
      text-overflow: ellipsis;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      color: @default-color;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

      &:hover {
        font-weight: bold;
      }
    }

    .menu-item-parent {
      font-weight: bold;
    }

    .menu-item-sub {
      margin: 0 5px;
      text-align: center;
    }
  }

  .menu-switch {
    position: absolute;
    right: 40px;
    bottom: 0;
    height: 40px;
    width: 40px;
    cursor: pointer;
    line-height: 40px;
    border-radius: 20px;
    color: @default-color;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    animation: menuFrames 5s infinite linear;

    &:hover {
      animation: none;
    }
  }
}
</style>