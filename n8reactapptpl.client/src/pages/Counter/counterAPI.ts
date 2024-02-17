
// ¼ÒÀÀ»·ºİ©I¥s WebAPI ¾Ş§@
// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount + 0.1 }), 500),
  )
}