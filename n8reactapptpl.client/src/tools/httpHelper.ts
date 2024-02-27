///## post data with JSON only.
///# ref��[Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)

//## �w�q ResponseError ���O�A�~�Ӧۤ��ت� Error ���O
export class ResponseError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ResponseError';
    // �s�W�۩w�q�ݩ�
    this.status = status;
    this.statusText = statusText;
  }
}

/// ����:��� postData �H�M�Ω�n�J�{�ҵ{�ǡC
/// response �u����: 200 JSON object �P 204 NoConennt�C
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
      credentials: 'same-origin', // include, same-origin, *omit; // �w�p���a XSRF-TOKEN Cookie �i��{�ҡC
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

/// ����:
/// response �u����: 200 JSON object �P 204 NoConennt�C
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
  /* ����@ */
}

export function downloadFile()
{
  /* ����@ */
}

//-----------------------------------------------------------------------------
//option: {
//  noblock: false,
//  manual: false,
//}
//
//function useLoadData(apiPath: string, args?: object, options?: object) {
//  return [data, loading, error, refetch];
//} <---- hooks �[�J�ӷ~�޿�A���A�X�@��
