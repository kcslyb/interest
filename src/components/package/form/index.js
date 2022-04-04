import CsForm from './src/CsForm.vue'
import CsFormItem from './src/CsFormItem.vue'
import CsInput from './src/items/CsInput.vue'
import CsRadio from './src/items/CsRadio.vue'
import CsCheckbox from './src/items/CsCheckbox.vue'
import CsTextarea from './src/items/CsTextarea.vue'

/* istanbul ignore next */
CsForm.install = function(Vue) {
    Vue.component('cs-form', CsForm)
    Vue.component('cs-input', CsInput)
    Vue.component('cs-radio', CsRadio)
    Vue.component('cs-form-item', CsFormItem)
    Vue.component('cs-checkbox', CsCheckbox)
    Vue.component('cs-textarea', CsTextarea)
}

export default CsForm