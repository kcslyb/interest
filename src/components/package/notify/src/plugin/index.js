// src/components/package/notify/src/index.js

import {createNotify} from './createNotify'

export default {
    install: (app) => {
        app.config.globalProperties.$csNotify = (params) => {
            createNotify(params)
        }
    }
}
