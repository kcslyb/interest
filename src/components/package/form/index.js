import CsForm from './src/CsForm.vue'
import CsFormItem from './src/CsFormItem.vue'
import CsInput from './src/items/CsInput.vue'
import CsRadio from './src/items/CsRadio.vue'
import CsCheckbox from './src/items/CsCheckbox.vue'
import CsTextarea from './src/items/CsTextarea.vue'

/* istanbul ignore next */
CsForm.install = function(Vue) {
    Vue.component('CsForm', CsForm)
    Vue.component('CsInput', CsInput)
    Vue.component('CsRadio', CsRadio)
    Vue.component('CsFormItem', CsFormItem)
    Vue.component('CsCheckbox', CsCheckbox)
    Vue.component('CsTextarea', CsTextarea)
}

export default CsForm