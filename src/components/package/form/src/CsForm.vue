<script>
import {computed, h, provide, reactive} from 'vue'
import CsFormItem from "./CsFormItem.vue";
import itemFactory from "./items/itemFactory";
import {isEmpty} from "../../../lib/utils";

export default {
  setup(props, {slots, attrs, expose}) {
    const reactData = reactive({
      validate: false
    })

    provide('csForm', {...attrs})

    const items = attrs.items || []

    // slots
    const slotsDefaults = slots.default ? slots.default() : []
    console.info(slotsDefaults)

    function generate(modelValue) {
      return items.map(item => {
        return h(CsFormItem, {
          ...item,
          validate: reactData.validate,
          modelValue: modelValue
        }, {
          default: () => itemFactory(modelValue, item)
        })
      })
    }

    function submit(callback) {
      const tempSlots = slots.default ? slots.default() : []
      reactData.validate = true
      slotsDefaults.map(value => value.props = Object.assign(value.props, {validate: reactData.validate}))
      const required = []
      const requiredMsg = []
      items.forEach(item => {
        checkedRequired(item, required, requiredMsg)
      })
      slotsDefaults.forEach((slot, index) => {
        slot.component.props.validate = true
        slot.component.props.errorMsg = tempSlots[index].props.errorMsg
        checkedRequired(tempSlots[index].props, required, requiredMsg)
      })
      const validate = required.length === 0
      if (callback) {
        return callback(validate, requiredMsg)
      }
      return new Promise((resolve, reject) => {
        if (validate) {
          resolve(true)
        } else {
          reject({validate, requiredMsg})
        }
      })
    }

    function checkedRequired(item, required, requiredMsg) {
      const {modelValue} = attrs
      const types = ['input', 'textarea']
      const flag = (item.errorMsg && (item.required || (item.required ?? '') === ''))
      if ((flag || (item.required || (item.required ?? '') === '') && isEmpty(modelValue[item.prop]))) {
        const text = types.includes(item.type || 'input') ? '请输入' : '请选择'
        requiredMsg.push({
          prop: item.prop,
          msg: item.errorMsg || `${text}${item.label}`
        })
        console.warn(`${text}${item.label} ---->prop: ${item.prop}`)
        required.push(false)
      }
    }

    // 使用expose才能用ref在外部调用
    expose({
      submit: submit
    })

    return () => {
      return h('div', {
        class: ['cs-form']
      }, [
        slotsDefaults,
        ...generate(attrs.modelValue)
      ])
    }
  }
}
</script>
<style scoped lang="less">
.cs-form {
  text-align: left;
  padding: 20px;
}
</style>