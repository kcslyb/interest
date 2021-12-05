import {typeJudge} from "./utils";
import cryptoJS from "crypto-js"

function generateToken () {
    const range = (start, stop) => Array.from(
        { length: (stop - start) + 1 },
        (_, i) => start + i)
    const number = range(0, 9).join('')
    const capital = range(65, 70).map(value => String.fromCharCode(Number(value))).join('')
    return `${number}${capital}`
}

export default class CryptoUtils {
    constructor() {
    }

    static MD5(data) {
        const strData = typeJudge(data) === 'String' ? data : JSON.stringify(data)
        return cryptoJS.MD5(strData).toString()
    }

    // 加密
    static encrypt(data) {
        try {
            const strData = typeJudge(data) === 'String' ? data : JSON.stringify(data)
            const keyHex = cryptoJS.enc.Latin1.parse(generateToken())
            const cryptoData = cryptoJS.enc.Utf8.parse(strData);
            const result = cryptoJS.AES.encrypt(cryptoData, keyHex,
                {
                    mode: cryptoJS.mode.ECB,
                    padding: cryptoJS.pad.Pkcs7
                }
            )
            return result.toString()
        } catch (e) {
            console.error(e)
        }
    }

    // 解密
    static decrypt(data) {
        try {
            const keyHex = cryptoJS.enc.Latin1.parse(generateToken())
            const bytes = cryptoJS.AES.decrypt(data, keyHex,
                {
                    mode: cryptoJS.mode.ECB,
                    padding: cryptoJS.pad.Pkcs7
                }
            )
            return JSON.parse(cryptoJS.enc.Utf8.stringify(bytes).toString())
        } catch (e) {
            console.error(e)
        }
    }
}