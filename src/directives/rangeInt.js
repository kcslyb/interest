const rangeInt = {
  inserted: function (el, binding) {
    if (!el.oninput) {
      // el-input
      el.children[0].oninput = function (e) {
        return checkValue(e, binding)
      }
      el.children[0].onblur = function (e) {
        const rg = /[.-]$/
        if (rg.test(e.target.value)) {
          e.target.value = ''
        }
      }
    }
  }
}
const checkValue = function(e, binding) {
  if (binding.value) {
    if (!Array.isArray(binding.value)) {
      throw new Error('Error：指令positiveInt的binding.value需要为范围数组 eg:[1, 100]')
    } else {
      const [min, max] = binding.value
      const reg = min < 0 ? /[^0-9.-]/g : /[^0-9.]/g
      e.target.value = e.target.value.replace(reg, '')
      if (e.target.value) {
        // 规范负号
        if (/[-]+/g.test(e.target.value)) {
          e.target.value = '-' + e.target.value.replace(/-/g, '')
        }
        // 规范小数点
        const index = e.target.value.indexOf('.')
        if (index > -1) {
          e.target.value = e.target.value.replace(/\./g, '')
          const threshold = /[-]+/g.test(e.target.value) ? 1 : 0
          if (index > threshold) {
            const values = [...e.target.value]
            if (index < values.length) {
              values.splice(index, 0, '.')
            } else {
              values.push('.')
            }
            e.target.value = values.join('')
          }
        }
        // 0开头数值加小数点
        if (/^[0][0-9]+/.test(e.target.value)) {
          const temp = e.target.value.match(/^[0]([0-9]+)/)
          const [, suffix] = temp
          e.target.value = `0.${suffix}`
        }
        // -0开头数值加小数点
        if (/^[-][0]([0-9]*)/.test(e.target.value) && e.target.value.indexOf('.') < 0) {
          const temp = e.target.value.match(/^[-][0]([0-9]*)/)
          const [, suffix] = temp
          if (e.data != null) {
            e.target.value = `-0.${suffix}`
          }
        }
        // 控制小数位: 可通过参数控制默认两位
        const rg = /(^[0-9-]+)\.([\d]+)/
        if (rg.test(e.target.value)) {
          e.target.value.replace(rg, val => {
            const flag = binding.arg != null
            const decimalPlace = flag ? +binding.arg : 2
            const matchList = e.target.value.match(rg)
            // 前缀 后缀
            const [, prefix, suffix] = matchList
            if (suffix.length > decimalPlace) {
              const resultSuffix = suffix.slice(0, decimalPlace)
              e.target.value = `${prefix}.${resultSuffix}`
            }
          })
        }
      }
      if (e.target.value && e.target.value < min) {
        e.target.value = min
      }
      if (e.target.value && e.target.value > max) {
        e.target.value = max
      }
    }
  }
  return e.target.value
}

export default rangeInt
