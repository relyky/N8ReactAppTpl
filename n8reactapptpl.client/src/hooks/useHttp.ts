import { useCallback } from "react";
import { ResponseError, downloadFile, postData, uploadFile } from "../tools/httpHelper";
import Swal from "sweetalert2";
import { useSetAtom } from "jotai";
import { blockingAtom } from "../atoms/metaAtom";

///※ 轉成 hooks 才能取用更多資源。
///※ 因改用 cookie 夾帶認證，故不需用 header 送 access token。
export function usePostData() {
  const setBlocking = useSetAtom(blockingAtom)

  const post = useCallback(
    <T>(url: string, args?: object) =>
      new Promise<T>((resolve, reject) => {
        setBlocking(true)
        postData<T>(url, args)
          .then(resolve)
          .catch((err: ResponseError) => {
            Swal.fire(`${err.status} ${err.statusText}`, err.message, 'error')
            reject(err)
          })
          .finally(() => setBlocking(false))
      })
    , [setBlocking]);

  return post;
}

export function useDownloadFile() {
  const setBlocking = useSetAtom(blockingAtom)

  const post = useCallback(
    (url: string, args?: object) =>
      new Promise<void>((resolve, reject) => {
        setBlocking(true)
        downloadFile(url, args)
          .then(resolve)
          .catch((err: ResponseError) => {
            Swal.fire(`${err.status} ${err.statusText}`, err.message, 'error')
            reject(err)
          })
          .finally(() => setBlocking(false))
      })
    , [setBlocking]);

  return post;
}

export function useUploadFile() {
  const setBlocking = useSetAtom(blockingAtom)

  const post = useCallback(
    <T>(url: string, formData: FormData) =>
      new Promise<T>((resolve, reject) => {
        setBlocking(true)
        uploadFile<T>(url, formData)
          .then(resolve)
          .catch((err: ResponseError) => {
            Swal.fire(`${err.status} ${err.statusText}`, err.message, 'error')
            reject(err)
          })
          .finally(() => setBlocking(false))
      })
    , [setBlocking]);

  return post;
}
