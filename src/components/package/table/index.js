import CsTable from './src/CsTable.vue'

/* istanbul ignore next */
CsTable.install = function(Vue) {
    Vue.component('cs-table', CsTable)
}

export default CsTable