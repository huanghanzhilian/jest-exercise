function mockTest(shouldCall, cb) {
  if (shouldCall) {
    return cb(42)
  }
}

it('test with mock function', () => {
  const mockCb = jest.fn()
  // jest.fn()创建了一个假的函数实现
  // 可以想象是一个监听器
  // 主要是收集函数调用的信息
  mockTest(true, mockCb)
  expect(mockCb).toHaveBeenCalled()
  // toHaveBeenCalled() 是否已经被调用
  expect(mockCb).toHaveBeenCalledWith(42)
  // toHaveBeenCalledWith(42) 调用的参数
  expect(mockCb).toHaveBeenCalledTimes(1)
  // toHaveBeenCalledTimes(1) 调用的次数

  // 数组，代表每次调用
  console.log(mockCb.mock.calls) // [ [ 42 ] ]

  // 数组，代表每次调用的返回值
  console.log(mockCb.mock.results) // [ { type: 'return', value: undefined } ] mockCb没有具体实现
})

it('test with implementation', () => {
  const mockCb = jest.fn(x => x * 2)
  mockTest(true, mockCb)
  console.log(mockCb.mock.calls)
  console.log(mockCb.mock.results) // [ { type: 'return', value: 84 } ]
})

it('test with implementation mockReturnValue', () => {
  const mockCb = jest.fn().mockReturnValue(20)
  mockTest(true, mockCb)
  console.log(mockCb.mock.calls)
  console.log(mockCb.mock.results) // [ { type: 'return', value: 20 } ]
})
