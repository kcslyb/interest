import CsNotify from './src/CsNotify.vue'

/* istanbul ignore next */
CsNotify.install = function(Vue) {
    Vue.component('cs-notify', CsNotify)
}

export default CsNotify