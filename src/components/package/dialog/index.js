import CsDialog from './src/CsDialog'

/* istanbul ignore next */
CsDialog.install = function(Vue) {
    Vue.component(CsDialog.name, CsDialog)
}

export default CsDialog