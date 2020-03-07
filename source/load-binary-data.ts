
export class LoadingError extends Error {}

export async function loadBinaryData(url: string): Promise<Uint8Array> {
	return new Promise<Uint8Array>((resolve, reject) => {

		let newUrl = url;
	  if (url.match('https://[0-9a-z]+.cloudfront.net/')) {
	  	newUrl = url + '?xhr=3'
		}
		const xhr = new XMLHttpRequest()
		xhr.open("GET", newUrl)
		xhr.responseType = "arraybuffer"

		const handleError = () => {
			reject(
				new LoadingError(`Error on binary data, status="${xhr.status}" from "${url}"`)
			)
		}
	
		xhr.onerror = handleError

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					resolve(new Uint8Array(xhr.response))
				}
				else {
					handleError()
				}
			}
		}

		xhr.send()
	})
}
