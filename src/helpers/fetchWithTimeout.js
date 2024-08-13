const fetchWithTimeout = (url, options = {}, timeout = 3000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ])
}

const exponentialBackoff = async (retryCount) => {
  const baseInterval = 3000
  const waitTime = baseInterval * Math.pow(2, retryCount)
  await delay(waitTime)
}

export const fetchWithRetries = async (url, requestOptions) => {
  let retryCount = 0
  const maxRetries = 5

  while (retryCount < maxRetries) {
    try {
      const request = await fetchWithTimeout(url, requestOptions)
      const response = await request.json()

      return response
    } catch (error) {
      if (error instanceof Response && error.status >= 500 && error.status < 600) {
        retryCount++
        await exponentialBackoff(retryCount)
        if (retryCount === maxRetries) {
          throw new Error('Se alcanzó el máximo de intentos de reintento')
        }
      } else {
        throw error
      }
    }
  }
}