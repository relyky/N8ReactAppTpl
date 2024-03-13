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
      credentials: 'same-origin', // include, same-origin, *omit // ���a Cookie �i��{�ҡC
      cache: 'no-cache',
      referrer: 'no-referrer',
    }).then(resp => {
      if (resp.status === 204) // NoContent
        resolve(undefined as TResult);
      else if (resp.ok)
        resolve(resp.json());
      else
        throw resp;
    }).catch((xhr: Response) =>
      xhr.text().then(errMsg =>
        reject(new ResponseError(errMsg, xhr.status, xhr.statusText))
      ).catch(fail => reject(fail))
    );
  });
}

//-----------------------------------------------------------------------------
/// ����:
/// response �u����: 200 BLOB object �P 400 ErrMsg�C
export async function downloadFile(url: string, args?: object, authToken?: string) {

  interface ContentDispositionOptions {
    type?: 'inline' | 'attachment';
    name?: string;
    filename?: string;
  }

  function parseContentDisposition(value: string): ContentDispositionOptions {
    const result: ContentDispositionOptions = {};
    const pairs = value.split(';');

    for (const pair of pairs) {
      const [name, ...valueComponents] = pair.trim().split('=');
      const nameTrimmed = name.trim().toLowerCase();

      if (nameTrimmed === 'attachment') {
        result.type = 'attachment';
      } else if (nameTrimmed === 'inline') {
        result.type = 'inline';
      } else if (nameTrimmed === 'filename') {
        const filename = valueComponents.join('=');
        result.filename = filename.trim().replace(/^"(.*)"$/, '$1');
      } else if (nameTrimmed === 'filename*') {
        const filename = decodeURIComponent(valueComponents.join('=').replace(/^UTF-8''/, ''));
        result.filename = filename;
      } else if (nameTrimmed === 'name') {
        const name = valueComponents.join('=');
        result.name = name.trim().replace(/^"(.*)"$/, '$1');
      }
    }

    return result;
  }

  /// �U���ɦW��b response headers[Content-Disposition] ���C
  function extractFilename(response: Response): string {
    const contentDisposition = response.headers.get('Content-Disposition');
    if (!contentDisposition)
      throw new ResponseError('No Content-Disposition header found in the response', 400, 'Bad Request');

    const { filename } = parseContentDisposition(contentDisposition);
    if (!filename)
      throw new ResponseError('Could not parse filename from Content-Disposition header', 400, 'Bad Request');

    return filename
  }

  function createBlobLink(blobUrl: string, filename: string): HTMLAnchorElement {
    const blobLink = document.createElement('a'); // create link for file
    blobLink.style.display = "none";
    blobLink.href = blobUrl;
    blobLink.download = filename; // the filename you want
    return blobLink;
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (typeof authToken === 'string')
      headers['Authorization'] = `Bearer ${authToken}`

    const response = await fetch(url, {
      headers,
      body: JSON.stringify(args),
      method: 'POST',
      mode: 'same-origin', // no-cors, cors, *same-origin
      credentials: 'same-origin', // include, same-origin, *omit // ���a Cookie �i��{�ҡC
      cache: 'no-cache',
      referrer: 'no-referrer',
    });

    if (!response.ok) {
      const errMsg = await response.text()
      throw new ResponseError(errMsg, response.status, response.statusText);
    }

    const filename = extractFilename(response)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const blobLink = createBlobLink(blobUrl, filename)

    // do download
    document.body.appendChild(blobLink)
    blobLink.click()

    // release resource
    document.body.removeChild(blobLink)
    window.URL.revokeObjectURL(blobUrl)
  }
  catch (xhr: unknown) {
    //console.error('downloadFile FAIL!', xhr)
    if (xhr instanceof Response) {
      const errMsg = await xhr.text()
      throw new ResponseError(errMsg, xhr.status, xhr.statusText)
    }

    throw xhr;
  }
}

//-----------------------------------------------------------------------------
/// ����:
/// response �u����: 200 JSON object �P 204 NoConennt�C
export function uploadFile<TResult>(url: string, formData: FormData, authToken?: string): Promise<TResult> {
  const headers: HeadersInit = {}

  if (typeof authToken === 'string')
    headers['Authorization'] = `Bearer ${authToken}`

  return new Promise<TResult>((resolve, reject) => {
    fetch(url, {
      headers,
      body: formData,
      method: 'POST',
      mode: 'same-origin', // no-cors, cors, *same-origin
      credentials: 'same-origin', // include, same-origin, *omit // ���a Cookie �i��{�ҡC
      cache: 'no-cache',
      referrer: 'no-referrer',
    }).then(resp => {
      if (resp.status === 204) // NoContent
        resolve(undefined as TResult);
      else if (resp.ok)
        resolve(resp.json());
      else
        throw resp;
    }).catch((xhr: Response) =>
      xhr.text().then(errMsg =>
        reject(new ResponseError(errMsg, xhr.status, xhr.statusText))
      ).catch(fail => reject(fail))
    );
  });
}
