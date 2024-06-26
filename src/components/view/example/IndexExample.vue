<template>
  <div>
    <eg-container content="">
      <cs-label showUnderLine label="loading方法"></cs-label>
      <cs-button @on-click="handleClickLoading('')">loading</cs-button>
      <cs-button @on-click="handleClickLoading('loading...')">loading Text</cs-button>
    </eg-container>
    <eg-container content="">
      <cs-label showUnderLine label="notify方法"></cs-label>
      <cs-button @on-click="handleClickNotify('default')">default</cs-button>
      <cs-button type="success" @on-click="handleClickNotify('success')">success</cs-button>
      <cs-button type="warning" @on-click="handleClickNotify('warning')">warning</cs-button>
      <cs-button type="error" @on-click="handleClickNotify('error')">error</cs-button>
    </eg-container>
    <eg-container content="">
      <cs-label showUnderLine label="dialog方法"></cs-label>
      <cs-button @on-click="handleClickDialog">dialog</cs-button>
    </eg-container>
    <eg-container>
      <cs-label label="form" showUnderLine>
        <template v-slot:right>
          <div>
            <cs-button @on-click="handleAdd">add</cs-button>
            <cs-button @on-click="handleUpdate">update</cs-button>
            <cs-button @on-click="handleDelete">delete</cs-button>
          </div>
        </template>
      </cs-label>
      <cs-table
          :columns="pageColumns"
          :data="data.pageData"
          @on-select-change="handleSelectChange">
      </cs-table>
    </eg-container>
    <cs-dialog title="示例新增弹窗页" :show="data.showForm" @on-close="data.showForm = false">
      <eg-container>
        <cs-form
            :items="items"
            ref="csFormData"
            v-model="data.formData">
        </cs-form>
        <div style="text-align: center">
          <cs-button text-alin="center" @on-click="handleSubmit">submit</cs-button>
        </div>
      </eg-container>
    </cs-dialog>
  </div>
</template>

<script setup>
import {routes} from "../../../route"
import CsButton from "../../package/button/src/CsButton.vue"
import CsForm from "../../package/form/src/CsForm.vue"
import EgContainer from "./components/EgContainer.vue"
import {useRouter} from "vue-router"
import {getCurrentInstance, reactive, h, ref} from "vue"
import LocalStorage from "../../lib/localStorage";
import {resetObj} from "../../lib/utils";

const data = reactive({
  tableData: [],
  formData: {},
  pageData: [],
  pageSelection: [],
  showForm: false
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

const csFormData = ref(null)

const handleAdd = () => {
  data.showForm = true
}

const handleUpdate = () => {
  data.showForm = true
}

const handleDelete = () => {
  if (data.pageSelection.length === 1) {
    const [temp] = data.pageSelection
    console.info(temp)
    LocalStorage.getInstance().deleteTableData(temp.id).then(res => {
      proxy.$csNotify({msg: res.msg})
      handleQueryPage()
    }).catch(error => {
      proxy.$csNotify({msg: error.msg})
    })
  } else if (data.pageSelection.length === 0) {
    proxy.$csNotify({msg: '请勾选需要删除的数据'})
  } else {
    proxy.$csNotify({msg: '一次只能删除单条数据'})
  }
}

const handleQueryPage = () => {
  proxy.$promiseCsLoading().then(loading => {
    LocalStorage.getInstance().queryTableDataPage({}).then(res => {
      data.pageData = res.data
      loading.close()
    }).catch(() => {
      loading.close()
    })
  })
}
handleQueryPage()

const handleSubmit = () => {
  proxy.$promiseCsLoading().then(loading => {
    const {value} = csFormData
    value.submit().then(res => {
      console.info('res:', res)
      console.info('formData:', data.formData)
      LocalStorage.getInstance().updateTableData(data.formData).then(res => {
        proxy.$csNotify({msg: res.msg})
        data.showForm = false
        handleQueryPage()
      })
    }).catch(e => {
      console.error(e)
    })
    loading.close()
  })
}

const handleSelectChange = (selection) => {
  data.pageSelection = selection
}


const items = [
  {
    type: 'input',
    prop: 'input',
    label: '输入框',
    required: true
  }, {
    type: 'textarea',
    prop: 'textarea',
    label: '文本框',
    required: true
  }, {
    type: 'radio',
    prop: 'radio',
    propName: 'radioName',
    label: '单选框',
    required: true
  }, {
    type: 'checkbox',
    prop: 'checkbox',
    propName: 'checkboxName',
    label: '多选框',
    required: true
  }, {
    type: 'checkbox',
    prop: 'checkbox2',
    propName: 'checkbox2Name',
    label: '多选框2',
    required: true
  }
]

const pageColumns = items.map(value => {
  value = Object.assign({}, value, {type: '', prop: value.propName || value.prop})
  return value
})
pageColumns.unshift({
  width: '50',
  type: 'checkbox',
  label: 'checkbox',
})

const handleClickLoading = (text) => {
  proxy.$promiseCsLoading({text}).then(res => {
    setTimeout(() => {
      res.close()
    }, 1000)
  })
}

const handleClickDialog = () => {
  let dialogCtx = null
  proxy.$csDialog({title: '新增'}, {
    default: () => h(CsForm, {
      ...{items: items, modelValue: data.formData}
    }),
    footer: () => h(CsButton, {
      onOnClick: () => {
        console.info('data')
        console.info(data.formData)
        // close dialog reset data.
        dialogCtx.handleClose(() => {
          resetObj(data.formData)
        })
      }
    }, {default: () => '保存'})
  }).then(proxy => {
    console.info('$csDialog.then: ', proxy)
    dialogCtx = proxy
  })
}

const handleClickNotify = (type) => {
  proxy.$csNotify({msg: `提示通知文本行${type}`, type})
}

const getContent = `const handleClickLoading = () => {
  proxy.$promiseCsLoading().then(res => {
    setTimeout(() => {
      res.close()
    }, 1000)
  })
}

const handleClickDialog = () => {
  proxy.$csDialog({title: '新增'}, {
    default: () => h(CsForm, {
      ...{items: items, modelValue: data.formData}
    }),
    footer: () => h(CsButton, {
      onOnClick: () => {
        console.info('data')
        console.info(data.formData)
      }
    }, {default: () => '保存'})
  }).then(res => {
    console.info('$csDialog.then: ', res)
  })
}

const handleClickNotify = () => {
  proxy.$csNotify({msg: '提示通知文本行'})
}`

</script>

<style scoped>

</style>