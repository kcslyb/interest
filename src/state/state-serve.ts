import StateStorage from "./state-storage"
import {BaseSateType, QuerySateType} from "./state-type"

class StateServe {
    constructor() {
        StateStorage.getInstance().setStateKey(this.constructor['name'])
    }

    save<T extends BaseSateType>(dto: T): Promise<string> {
        return StateStorage.getInstance().inset(dto)
    }

    update<T extends BaseSateType>(dto: T): Promise<string> {
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

const serverMap = {
    UserStateServe
}

const getStateServer = (serverName: string) => {
    if (serverName in serverMap) {
        return new serverMap[serverName]()
    }
    throw new Error('无效的服务名，无法创建服务示例')
}

export default getStateServer