import { useCallback } from "react";
import { ResponseError, postData } from "../tools/httpHelper";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAccount } from "../store/accountSlice";
import { setBlocking, setTopAlert } from "../store/metaSlice";
import Swal from "sweetalert2";



export function usePostData() {
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)

  const post = useCallback(
    async <T>(url: string, args?: object): Promise<T> => {
      try {
        dispatch(setBlocking(true))
        const data = await postData<T>(url, args, account?.authToken)
        return data
      }
      catch (err) {
        if (err instanceof ResponseError) {
          // �i�e�T���� top-alert �϶�
          dispatch(setTopAlert({ severity: 'error', text: `${err.status} ${err.statusText} ${err.message}` }))
          // ����ܰT��
          Swal.fire(`${err.status} ${err.statusText}`, err.message, 'error')
        }
        throw err //���@�w�n throw �_�h�N�P�w�����\�C
      }
      finally {
        dispatch(setBlocking(false))
      }
    }
    , [account?.authToken, dispatch]);

  return post;
}