///## post data with JSON only.
///# ref→[Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)

//## 定義 ResponseError 類別，繼承自內建的 Error 類別
export class ResponseError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ResponseError';
    // 新增自定義屬性
    this.status = status;
    this.statusText = statusText;
  }
}

/// 說明:改自 postData 以專用於登入認證程序。
/// response 只接受: 200 JSON object 與 204 NoConennt。
export function postAuth<TResult>(url: string, args?: object): Promise<TResult> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  return new Promise<TResult>((resolve, reject) => {
    fetch(url, {
      headers,
      body: JSON.stringify(args),
      method: 'POST',
      mode: 'same-origin', // no-cors, cors, *same-origin
      credentials: 'same-origin', // include, same-origin, *omit; // 預計夾帶 XSRF-TOKEN Cookie 進行認證。
      cache: 'no-cache',
      referrer: 'no-referrer',
    }).then(resp => {
      if (resp.status === 204) // NoContent
        resolve(undefined as TResult);
      else if (resp.ok)
        resolve(resp.json());
      else
        throw resp;
    }).catch((xhr: Response) => {
      xhr.text().then(errMsg => {
        reject(new ResponseError(errMsg, xhr.status, xhr.statusText))
        return;
      });
    });
  });
}

/// 說明:
/// response 只接受: 200 JSON object 與 204 NoConennt。
export function postData<TResult>(url: string, args?: object, authToken?: string): Promise<TResult> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (typeof authToken === 'string')
    headers['Authorization'] = `Bearer ${authToken}`

  return new Promise<TResult>((resolve, reject) => {
    fetch(url, {
      headers,
      body: JSON.stringify(args),
      method: 'POST',
      mode: 'same-origin', // no-cors, cors, *same-origin
      credentials: 'omit', // include, same-origin, *omit
      cache: 'no-cache',
      referrer: 'no-referrer',
    }).then(resp => {
      if (resp.status === 204) // NoContent
        resolve(undefined as TResult);
      else if (resp.ok)
        resolve(resp.json());
      else 
        throw resp;
    }).catch((xhr: Response) => {
      xhr.text().then(errMsg => {
        reject(new ResponseError(errMsg, xhr.status, xhr.statusText))
        return;
      });
    });
  });
}

//-----------------------------------------------------------------------------
export function uploadFile() 
{
  /* 未實作 */
}

export function downloadFile()
{
  /* 未實作 */
}

//-----------------------------------------------------------------------------
//option: {
//  noblock: false,
//  manual: false,
//}
//
//function useLoadData(apiPath: string, args?: object, options?: object) {
//  return [data, loading, error, refetch];
//} <---- hooks 加入商業邏輯，不適合共用
