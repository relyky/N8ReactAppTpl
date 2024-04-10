import { useCallback } from "react";
import { RecoilState, useSetRecoilState } from "recoil"

export function useRecoilUpdater<T>(recoilState: RecoilState<T>) {
  const setter = useSetRecoilState<T>(recoilState)

  const assignProps = useCallback((newValue: Partial<T>) => {
    setter(currVal => ({ ...currVal, ...newValue }))
  }, [setter])

  const assignValue = useCallback((name: keyof T, value: unknown) => {
    setter(currVal => ({ ...currVal, [name]: value }))
  }, [setter])

  return { assignProps, assignValue };
}
