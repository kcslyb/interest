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
<!--    <cs-loading :show="true"></cs-loading>-->
<!--    <cs-dialog :show="true">-->
<!--    </cs-dialog>-->
<!--    <cs-form v-model="data.formData" :items="items"></cs-form>-->
  </eg-container>
  <eg-container>
    <cs-button @on-click="handleClickLoading">loading</cs-button>
    <cs-button @on-click="handleClickDialog">dialog</cs-button>
  </eg-container>
</template>

<script setup>
import {routes} from "../../../route"
import CsButtonGroup from "../../package/button/src/CsButtonGroup.vue"
import CsButton from "../../package/button/src/CsButton.vue"
import CsTable from "../../package/table/src/CsTable.vue"
import CsLabel from "../../package/label/src/CsLabel.vue"
import CsDialog from "../../package/dialog/src/CsDialog.vue"
import CsLoading from "../../package/loading/src/CsLoading.vue"
import CsForm from "../../package/form/src/CsForm.vue"
import EgContainer from "./components/EgContainer.vue"
import {useRouter} from "vue-router"
import PublicApi from "../../../api/typicode"
import {getCurrentInstance, reactive, h} from "vue"
import createLoading from "../../package/loading";
const data = reactive({
  tableData: [],
  formData: {
    text: 'sdfasdf'
  }
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

// PublicApi.postsPage(1).then(res => {
//   data.tableData = res || []
// })
const items = [
  {
    prop: 'text',
    type: 'input',
    label: '文本框'
  }
]

const handleClickLoading = () => {
  proxy.$promiseCsLoading().then(res => {
    setTimeout(() => {
      res.close()
    }, 1000)
  })
}

const handleClickDialog = () => {
  proxy.$csDialog( {}, { default: () => h(EgContainer, {props: 'params'}) }).then(res => {
    console.info('$csDialog.then: ', res)
  })
}

</script>

<style scoped>

</style>