import { useCallback, useMemo } from "react"
import { fetchCount } from "./counterAPI"
import Swal from "sweetalert2"
import { selectBlocking, selectTopAlert } from "../../atoms/metaAtom"
import { atom, useSetAtom } from "jotai"

type CounterStatusType = "idle" | "loading" | "failed"

interface CounterState {
  value: number
  status: CounterStatusType
}

//-----------------------------------------------------------------------------

const initialState: CounterState = {
  value: 0,
  status: "idle",
}

export const counterAtom = atom(initialState)
counterAtom.debugLabel = 'counterAtom'

//-----------------------------------------------------------------------------
/**
 * 一般並不需要拆開單一 auto 取各個屬性值。而是自多個 atoms 組合出複合狀態值才對。
 */

// derivedAtom / selector
export const selectCount = atom(
  (get) => get(counterAtom).value
)
selectCount.debugLabel = 'selectCount'

//export const selectCount = selector<number>({
//  key: `${ATOM_KEY}/value`,
//  get: ({ get }) => (get(counterAtom).value),
//});

// derivedAtom / selector
export const selectStatus = atom(
  (get) => get(counterAtom).status
)
selectCount.debugLabel = 'selectStatus'

//export const selectStatus = selector<CounterStatusType>({
//  key: `${ATOM_KEY}/status`,
//  get: ({ get }) => (get(counterAtom).status),
//});

//-----------------------------------------------------------------------------
export function useCounterAction() {
  const setCounter = useSetAtom(counterAtom)
  const setBlocking = useSetAtom(selectBlocking)
  const setTopAlert = useSetAtom(selectTopAlert)

  const increment = useCallback(() => {
    setCounter(prev => ({ ...prev, value: prev.value + 1 }))
  }, [setCounter])

  const decrement = useCallback(() => {
    setCounter(prev => ({ ...prev, value: prev.value - 1 }))
  }, [setCounter])

  const incrementByAmount = useCallback((amount: number) => {
    setCounter(prev => ({ ...prev, value: prev.value + amount }))
  }, [setCounter])

  const incrementIfOdd = useCallback((amount: number) => {
    setCounter(prev => {
      const currentValue = Math.floor(prev.value)
      return (currentValue % 2 === 1 || currentValue % 2 === -1)
        ? { ...prev, value: currentValue + amount }
        : prev;
    })
  }, [setCounter])

  const incrementAsync = useCallback(async (amount: number) => {
    try {
      setCounter(prev => ({ ...prev, status: "loading" }))

      setBlocking(true)
      const response = await fetchCount(amount) // Promise

      // 可送訊息到 top-alert 區塊
      setTopAlert({ severity: 'success', text: `成功累加 amount: ${amount}。` })
      // 或顯示訊息
      Swal.fire("incrementAsync", `成功累加 amount: ${amount}。`, 'success')

      setCounter(prev => ({
        ...prev,
        value: prev.value + response.data,
        status: "idle"
      }))
    }
    catch (err: unknown) {
      setCounter(prev => ({ ...prev, status: "failed" }))
      if (typeof err === 'string') {
        // 可送訊息到 top-alert 區塊
        setTopAlert({ severity: 'error', text: err })
        // 或顯示訊息
        Swal.fire("incrementAsync", err, 'error')
      } else {
        throw err;
      }
    }
    finally {
      setBlocking(false)
    }
  }, [setBlocking, setCounter, setTopAlert])

  // 回傳 handlers
  return useMemo(() =>
    ({ increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync }),
    [decrement, increment, incrementByAmount, incrementIfOdd, incrementAsync]);
}