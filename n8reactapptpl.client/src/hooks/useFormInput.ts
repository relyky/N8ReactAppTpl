import { useReducer } from "react";

//export interface FormInputState {
//  [key: string]: unknown
//}

type FormAction =
  | { type: 'update', name: string, value: unknown }
  | { type: 'reset' }

export function useFormInput<T extends object>(initialState: T):
  [
    formState: T,
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    reset: () => void
  ] {
  const [formState, dispatch] = useReducer((state: T, action: FormAction) => {
    switch (action.type) {
      case 'update':
        return {
          ...state,
          [action.name]: action.value
        };
      case 'reset':
        return initialState;
      default:
        return state;
    }
  }, initialState);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    = (e) => {
      dispatch({
        type: 'update',
        name: e.target.name,
        value: e.target.value
      });
    }

  const reset = () => dispatch({ type: 'reset' });

  return [formState, handleChange, reset];
}
