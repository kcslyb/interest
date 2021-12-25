import {createApp} from 'vue'
import App from './App.vue'
import router from "./route"
import http from './http/index.js'
import store from './store/index.js'
import './assets/style/common.less'
import CsDialog from './components/package/dialog/src/plugin'
import csNotify from './components/package/notify/src/plugin'
import CsLoading from './components/package/loading/src/plugin'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CsLoading).use(CsDialog).use(csNotify)
app.config.globalProperties.$http = http
app.config.globalProperties.$store = store
app.mount('#app')
