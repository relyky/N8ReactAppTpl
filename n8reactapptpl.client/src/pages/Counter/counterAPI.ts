
// 模擬遠端呼叫 WebAPI 操作
// A mock function to mimic making an async request for data
//export const fetchCount = (amount = 1) => {
//  return new Promise<{ data: number }>(resolve =>
//    setTimeout(() => resolve({ data: amount + 0.1 }), 500),
//  )
//}

// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => {
      if (amount === 4) {
        reject('模擬測試失敗')
        return
      }

      resolve({ data: amount + 0.1 });
    }, 1000),
  )
}