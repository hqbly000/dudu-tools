import { merge } from './index.js'

const a = {
  __config__: {
    componentName: 'i-select',
    componentDataType: '1111',
    label: '下拉选择',
    parentColumnName: '',
    remoteOptions: {
      a: 'b',
      bb: 'aa'
    }
  }
}

const b = {
  __config__: {
    componentName: 'i-select',
    componentDataType: '222',
    label: '下拉选择'
  },

  dictType: ''
}

const res = merge({}, a, b)

console.log(res)
