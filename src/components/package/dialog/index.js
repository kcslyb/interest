import CsDialog from './src/CsDialog.vue'

/* istanbul ignore next */
CsDialog.install = function(Vue) {
    Vue.component('cs-dialog', CsDialog)
}

export default CsDialog