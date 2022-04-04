<template>
  <div class="menu">
    <cs-list :prop-obj="propObj" :options="menus" @click-item="handleRouterClick"></cs-list>
  </div>
</template>

<script setup>
import CsList from '../../components/package/list/src/CsList.vue'
import {computed, reactive, ref} from "vue";
import {mapGetters, useStore} from "vuex";
import {
  QUERY_ACCOUNT,
  QUERY_CURRENT_ROUTER,
  QUERY_ROUTER,
  SET_CURRENT_ROUTER
} from "../../store/mutation-types";
import {useRouter} from "vue-router";
import getStateServer from "../../state/state-serve";

const state = useStore()
const router = useRouter()

const show = ref(true)
const data = reactive({
  userInfo: {}
})

const propObj = {
  value: 'path',
  label: 'nameLabel',
  children: 'children'
}

data.userInfo = computed(mapGetters([`account/${QUERY_ACCOUNT}`])[`account/${QUERY_ACCOUNT}`]
    .bind({$store: state})) || []

const currentItem = reactive({})

const routers = computed(mapGetters([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].bind({$store: state}))

const currentRoute = computed(mapGetters([`router/${QUERY_CURRENT_ROUTER}`])[`router/${QUERY_CURRENT_ROUTER}`]
    .bind({$store: state})) || []

const [storageMenu] = [...routers.value].filter(val => val['name'] === 'storage')

const menus = storageMenu.children.map(val => {
  return {...val, nameLabel: val.meta.label}
})

const handleRouterClick = (menu) => {
  if (currentRoute.value.meta.path === menu.meta.path) {
    return
  }
  if (!menu.meta.next) {
    state.commit(`router/${SET_CURRENT_ROUTER}`, menu)
    router.push(menu.meta.path).then(res => {
      getStateServer('LogStateServe').commitSimpleLog()
    }).catch(() => {
    })
  }
}

</script>

<style scoped lang="less">
.menu {
  padding: 5px;
}
</style>