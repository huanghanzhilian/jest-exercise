const axios = require("axios");
const fetchUser = (cb) => {
  setTimeout(() => {
    cb('hello')
  }, 1000)
}

const loopFetchUser = (cb) => {
  setTimeout(() => {
    cb('one')
    setTimeout(() => {
      cb('two')
    }, 2000)
  }, 1000)
}

// 接管时间相关
jest.useFakeTimers('legacy')

// 一次走完所有的时间
it('test the callback after 1 sec', () => {
  const callback = jest.fn()
  fetchUser(callback)
  expect(callback).not.toHaveBeenCalled()
  expect(setTimeout).toHaveBeenCalledTimes(1)
  jest.runAllTimers()
  expect(callback).toHaveBeenCalled()
  expect(callback).toHaveBeenCalledWith('hello')
})

// 运行等待的执行
it('test the callback in timeout loops', () => {
  const callback = jest.fn()
  loopFetchUser(callback)
  expect(callback).not.toHaveBeenCalled()
  jest.runOnlyPendingTimers()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenLastCalledWith('one')
  jest.runOnlyPendingTimers()
  expect(callback).toHaveBeenCalledTimes(2)
  expect(callback).toHaveBeenLastCalledWith('two')
})

// 使用提前计时器测试回调
it('test the callback with advance timer', () => {
  const callback = jest.fn()
  loopFetchUser(callback)
  expect(callback).not.toHaveBeenCalled()
  jest.advanceTimersByTime(1000)
  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenLastCalledWith('one')
  jest.advanceTimersByTime(2000)
  expect(callback).toHaveBeenCalledTimes(2)
  expect(callback).toHaveBeenLastCalledWith('two')
})
