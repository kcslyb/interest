<template>
  <div class="menu">
    <cs-list :prop-obj="propObj" :options="menus" @click-item="handleRouterClick"></cs-list>
  </div>
</template>

<script setup>
import CsList from '../../components/package/list/src/CsList.vue'
import {computed, reactive, ref} from "vue";
import {mapGetters, useStore} from "vuex";
import {QUERY_ROUTER, SET_CURRENT_ROUTER} from "../../store/mutation-types";
import {useRouter} from "vue-router";

const state = useStore()
const router = useRouter()

const show = ref(true)

const propObj = {
  value: 'path',
  label: 'name',
  children: 'children'
}

const currentItem = reactive({})

const routers = computed(mapGetters([`router/${QUERY_ROUTER}`])[`router/${QUERY_ROUTER}`].bind({$store: state}))

const menus = [...routers.value].filter(val => val['name'] === 'storage')

const handleRouterClick = (menu) => {
  if (!menu.meta.next) {
    state.commit(`router/${SET_CURRENT_ROUTER}`, menu)
    router.push(menu.meta.path).catch(() => {
    })
  }
}

</script>

<style scoped lang="less">
  .menu {
    padding: 5px;
  }
</style>