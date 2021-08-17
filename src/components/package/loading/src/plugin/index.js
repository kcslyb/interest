// src/components/package/loading/src/index.js
import createLoading from "./createLoading";

export default {
    install: (app, options) => {
        console.info(options)
        app.config.globalProperties.$csLoading  = (params = {}) => {
            return createLoading(params)
        }
        app.config.globalProperties.$promiseCsLoading  = (params = {}) => {
            return new Promise((resolve, reject) => {
                try {
                    const instance = createLoading(params)
                    resolve(instance)
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
}