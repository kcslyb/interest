import {BaseSateType, QuerySateType} from "./state-type"
import {generateRandom, getCurrentDataTime} from "../components/lib/utils"


class StateStorage {
    constructor() {
    }
    private stateKey: string
    private static instance: StateStorage

    public static getInstance() {
        if (!StateStorage.instance) {
            StateStorage.instance = new StateStorage()
        }
        return StateStorage.instance
    }

    setStateKey(key: string) {
        this.stateKey = key
    }

    getStateKey() {
        return this.stateKey
    }

    inset<T extends BaseSateType>(dto: T): Promise<T> {
        // @ts-ignore
        return new Promise(resolve => {
            dto.id = generateRandom()
            this.checkValid(dto.id)
            dto.createTime = getCurrentDataTime()
            // 保存id和实体类关系
            const state = this.getStateByKey(this.constructor['name']) || {}
            state[dto.id] = this.getStateKey()
            this.setState(this.constructor['name'], state)
            // 保存实体数据
            const states = this.getStateByKey(this.getStateKey()) || []
            states.unshift(dto)
            this.setState(this.getStateKey(), states)
            setTimeout(() => {
                resolve(dto)
            }, 1000)
        })
    }

    update<T extends BaseSateType>(dto: T): Promise<T> {
        // @ts-ignore
        return new Promise(resolve => {
            const {id} = dto
            const {index, states} = this.selectById(id)
            dto.updateTime = getCurrentDataTime()
            states[index] = dto
            this.setState(this.getStateKey(), states)
            setTimeout(() => {
                resolve(dto)
            }, 1000)
        })
    }

    queryById(id: string) {
        // @ts-ignore
        return new Promise(resolve => {
            const {index, states} = this.selectById(id)
            setTimeout(() => {
                resolve(states[index])
            }, 1000)
        })
    }

    queryAll<T extends QuerySateType>(dto: T): Promise<string> {
        // @ts-ignore
        return new Promise(resolve => {
            const stateKey = this.getStateKey()
            const states = this.getStateByKey(stateKey) || []
            setTimeout(() => {
                resolve(states)
            }, 1000)
        })
    }

    selectById(id: string) {
        this.checkValid(id)
        const stateKey = this.getStateKey()
        const states = this.getStateByKey(stateKey) || []
        const index = states.findIndex(val => val.id === id)
        if (index > -1) {
            return {id, index, states, stateKey}
        } else {
            throw new Error(`${stateKey}中无效的id: ${id}`)
        }
    }

    private setState(key: string, state: any) {
        try {
            localStorage.setItem(key, JSON.stringify(state))
        } catch (e) {
            throw new Error('超出存储大小限制，保存数据失败')
        }
    }

    private getStateByKey(key: string) {
        const state = localStorage.getItem(key)
        return state ? JSON.parse(state) : undefined
    }

    private checkValid(valid: string, key: string = 'id') {
        if ((valid ?? '') === '') {
            throw new Error(`${key}不能为空`)
        }
    }
}

export default StateStorage