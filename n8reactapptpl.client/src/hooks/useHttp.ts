import { useCallback } from "react";
import { ResponseError, postData } from "../tools/httpHelper";
import { useAppDispatch } from "../store/hooks";
import { setBlocking, setTopAlert } from "../store/metaSlice";
import Swal from "sweetalert2";


export function usePostData() {
  const dispatch = useAppDispatch()

  const post = useCallback(
    async <T>(url: string, args?: object): Promise<T> => {
      try {
        dispatch(setBlocking(true))
        const data = await postData<T>(url, args)
        return data
      }
      catch (err) {
        if (err instanceof ResponseError) {
          // 可送訊息到 top-alert 區塊
          dispatch(setTopAlert({ severity: 'error', text: `${err.status} ${err.statusText} ${err.message}` }))
          // 或顯示訊息
          Swal.fire(`${err.status} ${err.statusText}`, err.message, 'error')
        }
        throw err //※一定要 throw 否則將判定為成功。
      }
      finally {
        dispatch(setBlocking(false))
      }
    }
    , [dispatch]);

  return post;
}