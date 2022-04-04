import CsQuill from './src/CsQuill.vue'

/* istanbul ignore next */
CsQuill.install = function(Vue) {
    Vue.component('cs-quill', CsQuill)
}

export default CsQuill