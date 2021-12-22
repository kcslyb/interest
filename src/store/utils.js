import {getCurrentInstance} from "vue";

export function storeDispatch(action) {
    const instance = getCurrentInstance()
    instance.appContext.config.globalProperties.$store.dispatch(action)
}