import { useCallback } from "react";
import { postData } from "../tools/httpHelper";
import { useAppSelector } from "../store/hooks";
import { selectAccount } from "../store/accountSlice";

//export function usePostData<T>()
//  : (url: string, args?: object) => Promise<T> {
//  const account = useAppSelector(selectAccount)
//
//  const post = useCallback((url: string, args?: object) => {
//    return postData<T>(url, args, account?.authToken)
//  }, [account?.authToken])
//
//  return post
//}

export function usePostData() {
  const account = useAppSelector(selectAccount);

  const post = useCallback(
    <T>(url: string, args?: object): Promise<T> => {
      return postData<T>(url, args, account?.authToken)
    }
    , [account?.authToken]);

  return post;
}