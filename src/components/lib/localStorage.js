import {generateRandom, isEmpty, typeJudge} from "./utils"
import CryptoUtils from "./crypto-utils";

class LocalStorage {
    constructor() {
    }
    static getInstance() {
        if (!LocalStorage.instance) {
            LocalStorage.instance = new LocalStorage()
        }
        return LocalStorage.instance
    }
    setItem(key, data) {
        if (typeJudge(key) !== 'String') {
            throw TypeError(`LocalStorage: saveKeyValue key type not String`)
        }
        let temp = data
        if (typeJudge(data) !== 'String') {
            temp = JSON.stringify(data)
        }
        localStorage.setItem(CryptoUtils.encrypt(key), CryptoUtils.encrypt(temp))
    }
    getItem(key) {
        if (isEmpty(key)) {
            throw TypeError(`LocalStorage: getItem key is not valid`)
        }
        const temp = localStorage.getItem(CryptoUtils.encrypt(key)) || ''
        if (isEmpty(temp)) {
            return ''
        }
        return CryptoUtils.decrypt(temp)
    }
    removeItem(key) {
        localStorage.removeItem(CryptoUtils.encrypt(key))
    }
    updateTableData(data, prop = 'id', keyName = 'tableData') {
        return new Promise((resolve, inject) => {
            setTimeout(() => {
                try {
                    const localData = this.getItem(keyName) || []
                    const index = localData.findIndex(value => value[prop] === data[prop])
                    const obj = {...data}
                    if (index > -1) {
                        localData.splice(index, 1, data)
                    } else {
                        obj[prop] = generateRandom()
                        localData.unshift(obj)
                    }
                    this.setItem(keyName, localData)
                    const label = index > -1 ? '修改' : '添加'
                    resolve({code: 200, msg: `${label}成功`, data: obj[prop]})
                } catch (e) {
                    inject({code: 500, msg: e, data: false})
                }
            }, 500)
        })
    }
    queryTableDataPage(params, prop = 'id', keyName = 'tableData') {
        return new Promise((resolve, inject) => {
            setTimeout(() => {
                try {
                    const {pageSize = 10, pageNum = 1} = params
                    const localData = this.getItem(keyName) || []
                    const num = pageNum <= 1 ? 0 : pageNum
                    const result = localData.slice(num, pageSize)
                    resolve({code: 200, msg: '查询成功', data: result})
                } catch (e) {
                    inject({code: 500, msg: e, data: false})
                }
            }, 1000)
        })
    }
    queryTableDataById(id, prop = 'id', keyName = 'tableData') {
        return new Promise((resolve, inject) => {
            setTimeout(() => {
                try {
                    const {pageSize = 10, pageNum = 1} = params
                    const localData = this.getItem(keyName) || []
                    const result = localData.filter(value => value[prop] === id)
                    if (result.length > 0) {
                        resolve({code: 200, msg: '查询成功', data: result[0]})
                    } else {
                        inject({code: 200, msg: `查询失败，${id}为无效主键`, data: {}})
                    }
                } catch (e) {
                    inject({code: 500, msg: e, data: false})
                }
            }, 1000)
        })
    }
    deleteTableData(id, prop = 'id', keyName = 'tableData') {
        return new Promise((resolve, inject) => {
            setTimeout(() => {
                try {
                    const localData = this.getItem(keyName) || []
                    if (typeJudge(localData) === 'Array') {
                        const index = localData.findIndex(value => value[prop] === id)
                        if (index > -1) {
                            localData.splice(index, 1)
                        } else {
                            inject({code: 500, msg: `删除失败，${id}为无效主键`, data: false})
                        }
                        this.setItem(keyName, localData)
                    }
                    resolve({code: 200, msg: '删除成功', data: id})
                } catch (e) {
                    inject({code: 500, msg: e, data: false})
                }
            }, 1000)
        })
    }
}

export default LocalStorage