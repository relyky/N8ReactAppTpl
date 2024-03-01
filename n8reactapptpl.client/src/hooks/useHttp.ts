import { useCallback } from "react";
import { ResponseError, postData } from "../tools/httpHelper";
import { useAppDispatch } from "../store/hooks";
import { setBlocking } from "../store/metaSlice";
import Swal from "sweetalert2";

///※ 轉成 hooks 才能取用更多資源。
export function usePostData() {
  const dispatch = useAppDispatch()

  const post = useCallback(
    <T>(url: string, args?: object) =>
      new Promise<T>((resolve, reject) => {
        dispatch(setBlocking(true))
        postData<T>(url, args)
          .then(resolve)
          .catch((err: ResponseError) => {
            Swal.fire(`${err.status} ${err.statusText}`, err.message, 'error')
            reject(err)
          })
          .finally(() => dispatch(setBlocking(false)))
      })
    , [dispatch]);

  return post;
}