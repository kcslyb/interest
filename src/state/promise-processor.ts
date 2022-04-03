import {createNotify} from '../components/package/notify/src/plugin/createNotify'

type Callback = {
    success: Function,
    error?: Function
}

class PromiseProcessor {
    private static instance: PromiseProcessor

    constructor() {
    }

    public static getInstance() {
        if (!PromiseProcessor.instance) {
            PromiseProcessor.instance = new PromiseProcessor()
        }
        return PromiseProcessor.instance
    }

    private handlePromise(promise: Promise<any>): Promise<any> {
        return promise.then(res => [undefined, res]).catch(err => [err, undefined])
    }

    private async handleResult(promise: Promise<any>, callback: Callback) {
        const result = await this.handlePromise(promise)
        const [err, res] = result
        if (err) {
            if (!callback.error) {
                callback.error = () => {
                    createNotify({msg: res.message})
                }
            }
            callback.error(err)
        } else {
            callback.success(res)
        }
    }
}