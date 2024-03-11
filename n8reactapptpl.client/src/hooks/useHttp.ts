import { useCallback } from "react";
import { ResponseError, downloadFile, postData } from "../tools/httpHelper";
import { useAppDispatch } from "../store/hooks";
import { setBlocking } from "../store/metaSlice";
import Swal from "sweetalert2";

///※ 轉成 hooks 才能取用更多資源。
///※ 因改用 cookie 夾帶認證，故不需用 header 送 access token。
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

export function useDownloadFile() {
  const dispatch = useAppDispatch()

  const post = useCallback(
    (url: string, args?: object) =>
      new Promise<void>((resolve, reject) => {
        dispatch(setBlocking(true))
        downloadFile(url, args)
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