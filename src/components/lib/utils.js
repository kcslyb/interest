// utils.js

// 判断类型
export function typeJudge(obj) {
    return Object.prototype.toString.call(obj).match(/\s(\w+)/)[1]
}

// 判断是否有指定字段
export function hasProperty(target, prop) {
    if (isEmpty(target)) return false
    return Object.prototype.hasOwnProperty.call(target, prop)
}

// 判断是否有指定字段
export function hasNotProperty(target, prop) {
    if (isEmpty(target)) return false
    return !Object.prototype.hasOwnProperty.call(target, prop)
}

// 判断空
export function isEmpty(val) {
    // null or undefined
    if (val == null) return true

    if (typeof val === 'boolean') return false

    if (typeof val === 'number') return val === 0 ? false : !val

    if (val instanceof Error) return val.message === ''

    switch (Object.prototype.toString.call(val)) {
        case '[object String]':
        case '[object Array]':
            return !val.length
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size
        }
        case '[object Object]': {
            return !Object.keys(val).length
        }
    }
    return false
}

export function isNotEmpty(val) {
    return !isEmpty(val)
}

// 生成随机数
export function generateRandom(n = 16, arr = []) {
    // 指定范围数
    const range = (start, stop) => Array.from({length: (stop - start) + 1}, (_, i) => start + i)
    // 大写字母
    const capital = range(65, 90).map(value => String.fromCharCode(Number(value)))
    // 小写字母
    const lowercase = range(97, 122).map(value => String.fromCharCode(Number(value)))
    // 数字
    const number = range(0, 9)
    const temp = arr.length > 0 ? arr : [].concat(capital).concat(lowercase).concat(number)
    const tempLength = temp.length
    const str = []
    for (let i = 0; i < n; i++) {
        const s = Math.floor(Math.random() * tempLength - 1)
        str.push(temp[s < 0 ? 0 : s])
    }
    return str.join('')
}

// 数组转map
export function arrayToMap(array, props = {key: 'id', value: 'label'}) {
    if (!Array.isArray(array)) return new Map()
    const temp = []
    array.forEach(value => {
        if (value[props.key] && value[props.value]) {
            temp.push([value[props.key], value[props.value]])
        } else {
            throw TypeError(`arrayToMap: array item is not prototype ${props.key} or ${props.value}`)
        }
    })
    return new Map(temp)
}

// 判断单个数组是否存在重复值
export function isRepeat(array) {
    if (array.length === 0) {
        return false
    }
    const result = [...new Set(array)]
    return result.length !== array.length
}

// 校验数据
export function checkNumber(range = [0, 100], decimalPlace = 2) {

}

// 判断两个数组是否存在重复值
export function isRepeats(arrayOne, arrayTwo) {
    if (arrayOne.length === 0 || arrayTwo.length === 0) {
        return false
    }
    const temp = [].concat([...new Set(arrayOne)]).concat([...new Set(arrayTwo)])
    return isRepeat(temp)
}

/**
 * 比较时间
 * @param oneDate
 * @param twoDate
 * @returns {number} 1：大于；0：等于；-1：小于
 */
export function compareDate(oneDate, twoDate) {
    if (isEmpty(oneDate) || isEmpty(twoDate)) {
        throw TypeError(`compareDate: params is empty -> oneDate: ${oneDate} or twoDate${twoDate}`)
    }
    const one = +new Date(oneDate)
    const two = +new Date(twoDate)
    return +(one > two) || +(one === two) - 1
}

export function randomNum(maxNum = 220, minNum = 200) {
    return Math.random() * (maxNum - minNum + 1) + minNum
}

export function numToHex(cNum) {
    const temp = parseInt(`${cNum}`).toString(16)
    return temp.length === 1 ? `0${temp}` : temp
}

export function getRandomColor(maxNum = 100, minNum = 120) {
    const temp = ['#']
    for (let i = 0; i < 3; i++) {
        const cNum = randomNum(maxNum, minNum)
        temp.push(numToHex(cNum))
    }
    return temp.join('')
}

export function shallowColor(leven = 0.5, color) {
    return changeColor(leven, false, color)
}

export function deepenColor(leven = 0.3, color) {
    return changeColor(leven, true, color)
}

export function changeColor(leven = 0.3, flag, color) {
    const oldColor = isEmpty(color) ? this.getRandomColor() : color
    const temp = oldColor.slice(1).match(/../g)
    for (let i = 0; i < 3; i++) {
        let tempNum = 0
        const cNum = parseInt(`0x${temp[i]}`).toString()
        if (flag) { // 加深
            tempNum = parseInt(cNum) - Math.floor(parseInt(cNum) * leven)
        } else { // 变浅
            tempNum = parseInt(cNum) + Math.floor((255 - parseInt(cNum)) * leven)
        }
        temp[i] = numToHex(tempNum)
    }
    return `#${temp.join('')}`
}

/**
 * 根据路径赋值对象属性
 * @param obj 原对象
 * @param path 属性路径
 * @param value 属性值
 * @returns {any}
 */
export function setObjValue(obj, path, value) {
    const temp = path.match(/\w+/g)
    if (!temp || ((value ?? '') === '')) return obj
    let pointer = obj
    const length = temp.length
    for (let i = 0; i < length; i++) {
        if (i === length - 1) {
            pointer[temp[i]] = value
        } else {
            if (isEmpty(pointer[temp[i]])) {
                const flag = temp[i + 1].match(/^\d+$/)
                pointer[temp[i]] = flag ? [] : {}
            }
            pointer = pointer[temp[i]]
        }
    }
    return obj
}

export function getObjValue(obj, path) {
    const temp = path.match(/\w+/g)
    if (!temp || path === '') return ''
    let pointer = obj
    const length = temp.length
    for (let i = 0; i < length; i++) {
        pointer = pointer[temp[i]]
    }
    return pointer
}

export function getCurrentDataTime(fmt = 'yyyy-MM-dd HH:mm:ss') {
    return dataFormat(new Date(), fmt)
}

export function dataFormat(data, fmt = 'yyyy-MM-dd HH:mm:ss') {
    const currentData = typeof data === 'object' ? data : new Date(data)
    const o = {
        "M+": currentData.getMonth() + 1, //月份
        "d+": currentData.getDate(), //日
        "h+": currentData.getHours() % 12 === 0 ? 12 : currentData.getHours() % 12, //小时
        "H+": currentData.getHours(), //小时
        "m+": currentData.getMinutes(), //分
        "s+": currentData.getSeconds(), //秒
        "q+": Math.floor((currentData.getMonth() + 3) / 3), //季度
        "S": currentData.getMilliseconds() //毫秒
    }
    const week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (currentData.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ?
            (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") :
            "") + week[currentData.getDay() + ""])
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
}

export function resetObj(obj) {
    if (!obj) return {}
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = ''
    }
    return obj
}

/**
 * 函数柯里化
 * @param fun
 * @returns {(function(...[*]): (*))|*}
 */
export function curring(fun) {
    return function curr(...args) {
        if (args.length >= fun.length) {
            return fun.apply(this, ...args)
        } else  {
            return function (...args2) {
                return curr.apply(this, args.concat(args2))
            }
        }
    }
}

/**
 * 判断是pc还是手机
 * @returns {boolean}
 */
export function isMobile() {
    const temp = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return (temp && temp.length > 0)
}