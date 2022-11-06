const toStr = Function.prototype.call.bind(Object.prototype.toString)
export function isObjectObject(t) {
  return toStr(t) === '[object Object]'
}
export function isObjectArray(t) {
  return toStr(t) === '[object Array]'
}
export function isObjectNull(t) {
  return toStr(t) === '[object Null]'
}
export function isObjectUnde(t) {
  return toStr(t) === '[object Undefined]'
}

export function isNil(t) {
  return isObjectNull(t) || isObjectUnde(t)
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) {
      flags.push('g')
    }
    if (obj.multiline) {
      flags.push('m')
    }
    if (obj.ignoreCase) {
      flags.push('i')
    }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

export function merge(target, source, obj) {
  if (isObjectUnde(obj) || isObjectUnde(obj)) {
    return Object.assign(source, {})
  }
  // console.log(source)
  Object.keys(source).forEach(key => {
    const value = source[key]
    if (!isNil(value) && (isObjectArray(value) || isObjectObject(value))) {
      target[key] = merge({}, value, obj[key])
    } else if (isNil(value)) {
      if (isNil(obj[key])) {
        target[key] = null
      } else {
        target[key] = obj[key]
      }
    } else {
      if (isNil(obj[key])) {
        target[key] = source[key]
      } else {
        target[key] = obj[key]
      }
    }
  })
  return target
}
