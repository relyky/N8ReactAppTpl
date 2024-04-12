import { PrimitiveAtom, WritableAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";


/**
 * 參考自：useAtom.d.mts, atom.d.mts
 */
type WithInitialValue<Value> = {
  init: Value;
};

// 宣告 useAtomUpdater 成多載函式。
export function useAtomUpdater<Value>(atom: PrimitiveAtom<Value> & WithInitialValue<Value>): {
  assignProps: (info: object) => void
  assignValue: (name: string, value: unknown) => void
};

export function useAtomUpdater<AtomType extends WritableAtom<object, unknown[], unknown>>(atom: AtomType): {
  assignProps: (info: object) => void
  assignValue: (name: string, value: unknown) => void
} {
  //const [state, setState] = useAtom(atom)

  const assignProps = useAtomCallback(
    useCallback((get, set, info: Partial<object>) => {
      set(atom, { ...get(atom), ...info })
    }, [atom]),
  )

  const assignValue = useAtomCallback(
    useCallback((get, set, name: string, value: unknown) => {
      set(atom, { ...get(atom), [name]: value })
    }, [atom]),
  )

  return { assignProps, assignValue };
}
