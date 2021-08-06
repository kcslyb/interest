<template>
  <div class="text-left margin-bottom">
    <cs-label label="示例">
      <template v-slot:right>
        <cs-button-group :btn-list="btnList" @on-click="handleClick"></cs-button-group>
      </template>
    </cs-label>
  </div>
  <eg-container>
    <cs-table :is-over-hidden="false" :columns="columns" :data="data.tableData"></cs-table>
  </eg-container>
</template>

<script setup>
import {routes} from "../../../route"
import CsButtonGroup from "../../package/button/src/CsButtonGroup.vue"
import CsTable from "../../package/table/src/CsTable.vue"
import CsLabel from "../../package/label/src/CsLabel.vue"
import EgContainer from "./components/EgContainer.vue"
import {useRouter} from "vue-router"
import PublicApi from "../../../api/typicode"
import {getCurrentInstance, reactive, ref} from "vue"

const data = reactive({
  tableData: []
})
const columns = [
  {type: 'checkbox', width: 50},
  {label: '序号', type: 'serial', width: 50},
  // {label: 'id', prop: 'id', width: 50},
  {label: '标题', prop: 'title', align: 'left'},
  {label: '内容', prop: 'body', align: 'left'}
]
const initMenuTree = () => {
  const children = []
  routes.forEach((value, index) => {
    if (value.meta && value.meta.label === '组件') {
      const temp = value.children || []
      temp.forEach((val, i) => {
        children.push({
          value: `menu_key_${index}_${i}}`,
          label: `${val.meta.label}API`,
          path: val.path,
          children: []
        })
      })
    }
  })
  return children
}
const btnList = initMenuTree()

const router = useRouter()

const handleClick = (item) => {
  router.push(item.path).catch(e => {
    console.error(e)
  })
}

const {proxy} = getCurrentInstance()

// PublicApi.querySongs().then(res => {
//   console.info(res)
// })

PublicApi.postsPage(1).then(res => {
  data.tableData = res || []
})

</script>

<style scoped>

</style>