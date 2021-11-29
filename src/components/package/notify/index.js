import CsNotify from './src/CsNotify.vue'

/* istanbul ignore next */
CsNotify.install = function(Vue) {
    Vue.component('CsNotify', CsNotify)
}

export default CsNotify