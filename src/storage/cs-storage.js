import LocalStorage from "../components/lib/localStorage";
import {generateRandom, getCurrentDataTime} from "../components/lib/utils";

class CsStorage {
    constructor(tableName) {
        this.tableName = tableName
        this.serve = LocalStorage.getInstance()
    }

    static getInstance(tableName) {
        if (!CsStorage.instance || CsStorage.instance.tableName !== tableName) {
            CsStorage.instance = new CsStorage(tableName)
        }
        return CsStorage.instance
    }

    save(params) {
        return new Promise((resolve, reject) => {
            try {
                const temp = this.serve.getItem(this.tableName) || []
                const id = generateRandom(32)
                const createTime = getCurrentDataTime()
                temp.unshift({...params, createTime, updateTime: '', id})
                this.serve.setItem(this.tableName, temp)
                resolve({code: 200, msg: id})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }

    deleteByIds(ids) {
        return new Promise((resolve, reject) => {
            try {
                if (!ids || ids.length === 0) {
                    reject({code: 500, msg: 'ids is not valid'})
                }
                const temp = this.serve.getItem(this.tableName) || []
                const result = temp.filter(value => !ids.includes(value.id))
                this.serve.setItem(this.tableName, result)
                resolve({code: 200, data: ids})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            try {
                if (!id) {
                    reject({code: 500, msg: 'id is not valid'})
                }
                const temp = this.serve.getItem(this.tableName) || []
                const result = temp.filter(value => value.id !== id)
                if (result.length === temp.length) {
                    reject({code: 500, msg: 'id is not valid'})
                }
                this.serve.setItem(this.tableName, result)
                resolve({code: 200, msg: id})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }

    deleteAll() {
        return new Promise((resolve, reject) => {
            try {
                this.serve.removeItem(this.tableName)
                resolve({code: 200})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }

    update(params) {
        return new Promise((resolve, reject) => {
            try {
                const {id = ''} = params
                if (!id) {
                    reject({code: 500, msg: 'id is not valid for params'})
                }
                const temp = this.serve.getItem(this.tableName) || []
                const result = temp.filter(value => value.id !== id)
                if (result.length === temp.length) {
                    reject({code: 500, msg: 'id is not valid'})
                }
                const [item] = result
                const obj = Object.assign({}, item, params, {updateTime: getCurrentDataTime()})
                result.unshift(obj)
                this.serve.setItem(this.tableName, result)
                resolve({code: 200, msg: id})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }

    queryById(id) {
        return new Promise((resolve, reject) => {
            try {
                if (!id) {
                    reject({code: 500, msg: 'id is not valid'})
                }
                const temp = this.serve.getItem(this.tableName) || []
                const result = temp.filter(value => value.id !== id)
                if (result.length === temp.length) {
                    reject({code: 500, msg: `not found valid data for id: ${id}`})
                }
                const [item] = result
                resolve({code: 200, msg: id, data: item})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }

    queryPage(params) {
        return new Promise((resolve, reject) => {
            try {
                const temp = this.serve.getItem(this.tableName) || []
                if (temp.length === 0) {
                    resolve({code: 200, data: []})
                }
                // 筛选
                const {keyword = ''} = params
                const tempObj = Object.assign({}, params)
                delete tempObj.keyword
                delete tempObj.pageSize
                delete tempObj.pageNum
                const entries = Object.entries(tempObj)
                const result = temp.filter(value => {
                    const flags = []
                    if (keyword) {
                        const values = Object.values(value)
                        for (let i = 0; i < values; i++) {
                            flags.push(values[i].indexOf(keyword) > -1)
                        }
                    }
                    const flags2 = []
                    if (entries.length) {
                        for (let i = 0; i < entries.length; i++) {
                            const [key, val] = entries[i]
                            flags2.push(value[key] === val)
                        }
                    }
                    const keywordFlag = (flags.length === 0 ? true : flags.includes(true))
                    const propFlag = (flags2.length === 0 ? true : !flags2.includes(false))
                    return keywordFlag && propFlag
                })
                if (result.length === 0) {
                    resolve({code: 200, data: []})
                }
                // 分页
                const {pageSize = 10, pageNum = 1} = params
                const start = pageNum < 1 ? 0 : pageNum - 1
                const end = pageSize < 0 ? 10 : pageSize > result.length ? result.length : pageSize
                const pageData = result.slice(start, end)
                const pageObj = {
                    pageNum,
                    pageSize,
                    data: pageData,
                    total: result.length
                }
                resolve({code: 200, data: pageObj})
            } catch (e) {
                reject({code: 500, msg: e})
            }
        })
    }
}

export default CsStorage