<template>
  <div class="account">
    <div class="cs-padding-top20">
      <cs-label label="账号管理" show-under-line>
        <template v-slot:right>
          <cs-button-group :btn-list="data.btnList" @on-click="handleBtnClick"/>
        </template>
      </cs-label>
    </div>
    <cs-table
        :data="data.pageData"
        :columns="data.pageColumns"
        @on-select-change="handleSelectChange">
    </cs-table>
  </div>
</template>

<script setup>
import CsForm from "../../components/package/form/src/CsForm.vue";
import CsTable from "../../components/package/table/src/CsTable.vue"
import CsLabel from "../../components/package/label/src/CsLabel.vue"
import CsButton from "../../components/package/button/src/CsButton.vue";
import CsInput from "../../components/package/form/src/items/CsInput.vue";
import CsFormItem from "../../components/package/form/src/CsFormItem.vue";
import CsButtonGroup from "../../components/package/button/src/CsButtonGroup.vue";

import {getCurrentInstance, h, reactive} from "vue";
import CsStorage from "../../storage/cs-storage";
import TABLE from "../../storage/table";


const data = reactive({
  btnList: [],
  formData: {},
  pageData: [],
  selection: [],
  pageColumns: []
})

const items = [
  {
    type: 'input',
    prop: 'userName',
    label: '用户名',
    required: true
  }, {
    type: 'input',
    inputType: 'password',
    prop: 'password',
    label: '密码',
    required: true
  }
]

data.btnList = [
  {
    type: 'primary',
    label: '新增'
  }, {
    type: 'warning',
    label: '删除'
  }
]

data.pageColumns = items.map(value => {
  value = Object.assign({}, value, {type: '', prop: value.propName || value.prop})
  return value
})
data.pageColumns = [
  {type: 'checkbox', label: '选择', width: '50'},
  {type: 'serial', label: '序号', width: '50'}
].concat(data.pageColumns)

const queryAccountData = () => {
  const csStorageServe = CsStorage.getInstance(TABLE.ACCOUNT)
  csStorageServe.queryPage({pageSize: 50}).then((res) => {
    if (res.code === 200) {
      data.pageData = res.data.data || []
    }
  })
}

queryAccountData()

const handleSelectChange = (rows) => {
  console.info(rows)
  data.selection = rows
}

const {proxy} = getCurrentInstance()

const handleBtnClick = (item) => {
  const process = {
    primary: () => {
      let dialog = null
      const formData = h(CsForm, {
        ...{items: items, modelValue: data.formData, 'label-width': '80px'}
      })
      proxy.$csDialog({title: '新增账号'}, {
        default: () => formData,
        footer: () => h(CsButton, {
          onOnClick: () => {
            console.info('data', formData)
            console.info(data.formData)
            formData.component.exposed.submit().then(() => {
              const csStorageServe = CsStorage.getInstance(TABLE.ACCOUNT)
              csStorageServe.save(data.formData).then(res => {
                if (res.code === 200) {
                  proxy.$csNotify({msg: '新增成功'})
                  queryAccountData()
                  dialog.component.ctx.handleClose()
                }
              }).catch(e => {
                proxy.$csNotify({msg: e.msg, type: 'error'})
              })
            })
          }
        }, {default: () => '保存'})
      }).then(res => {
        console.info('$csDialog.then: ', res)
        dialog = res
      })
    },
    warning: () => {
      const ids = data.selection.map(value => value.id)
      const csStorageServe = CsStorage.getInstance(TABLE.ACCOUNT)
      csStorageServe.deleteByIds(ids).then(res => {
        if (res.code === 200) {
          proxy.$csNotify({msg: '删除成功'})
          queryAccountData()
        }
      }).catch(e => {
        proxy.$csNotify({msg: e.msg, type: 'error'})
      })
    }
  }
  process[item.type] && process[item.type]()
}

</script>

<style scoped lang="less">
.account {
  width: 80%;
  text-align: center;
  display: inline-block;
}
</style>