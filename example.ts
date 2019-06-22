import MockAdapter from 'axios-mock-adapter'
import definitively, { DefinitivelyResponse } from '.'

const instance = definitively.create({
  validateStatus: (status) => status < 500,
})

const mock = new MockAdapter(instance.axios)
mock.onGet('/mock').reply(() => {
  const patterns = [
    [200, { hoge: 'hoge' }], // as SchemaA
    [201, { hoge: 'hoge' }], // as SchemaA
    [400, { fuga: 123 }], // as SchemaB
  ]
  return patterns[Math.floor(Math.random() * patterns.length)]
})

interface SchemaA { hoge: string }
interface SchemaB { fuga: number }
type DefinitivelyA = DefinitivelyResponse<200 | 201, SchemaA>
type DefinitivelyB = DefinitivelyResponse<400, SchemaB>

const call = async () => {
  try {
    const response = await instance.get<DefinitivelyA | DefinitivelyB>('/mock')
    switch (response.status) {
      case 200:
      case 201:
        console.log('type safe SchemaA', response.status, response.data.hoge)
        break
      case 400:
        console.log('type safe SchemaB', response.status, response.data.fuga)
        break
      default:
        console.log('runtime error!')
    }
  } catch (error) {
    console.info('received error!', error.response.status)
  }
}

new Array(10).fill(0).forEach(call)
