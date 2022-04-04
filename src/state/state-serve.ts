import StateStorage from "./state-storage"
import {BaseSateType, QuerySateType} from "./state-type"
import {mapActions} from "vuex"
import {getCurrentDataTime} from "../components/lib/utils"
import {SET_ACCESS, QUERY_CURRENT_ROUTER, QUERY_ACCOUNT} from "../store/mutation-types"
import store from '../store/index.js'

class StateServe {
    constructor() {
        StateStorage.getInstance().setStateKey(this.constructor['name'])
    }

    save<T extends BaseSateType>(dto: T): Promise<T> {
        return StateStorage.getInstance().inset(dto)
    }

    update<T extends BaseSateType>(dto: T): Promise<T> {
        return StateStorage.getInstance().update(dto)
    }

    queryPage<T extends QuerySateType>(params: T): Promise<any> {
        return StateStorage.getInstance().queryAll(params)
    }

    queryById(id: string): Promise<any> {
        return StateStorage.getInstance().queryById(id)
    }
}

class UserStateServe extends StateServe {
    constructor() {
        super()
    }
}

class LogStateServe extends StateServe {
    constructor() {
        super()
    }

    commitSimpleLog(labelMsg?: string | null) {
        const userInfo = store.getters[`account/${QUERY_ACCOUNT}`]
        const currentRouter = store.getters[`router/${QUERY_CURRENT_ROUTER}`]
        const accessDto = {
            accessTime: getCurrentDataTime(),
            accessUserid: userInfo.id,
            accessUserName: userInfo.userName,
            accessPath: currentRouter?.meta?.path,
            accessPathLabel: labelMsg || currentRouter?.meta?.label,
        }
        mapActions([`access/${SET_ACCESS}`])[`access/${SET_ACCESS}`].call({$store: store}, accessDto)
    }
}

const serverMap = {
    UserStateServe,
    LogStateServe
}

const getStateServer = (serverName: string) => {
    if (serverName in serverMap) {
        return new serverMap[serverName]()
    }
    throw new Error('无效的服务名，无法创建服务示例')
}

export default getStateServer