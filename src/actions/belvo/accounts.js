'use server'

import { fetchWithRetries } from "@/helpers";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAccountsByLink = async(linkId) => {
  const url = `${process.env.BELVO_BASE_URL}/api/accounts/?link=${linkId}`
  const username = process.env.BELVO_SECRET_ID
  const password = process.env.BELVO_SECRET_PASSWORD
  const credentials = btoa(`${username}:${password}`)

  const headers = {
    'Authorization': `Basic ${credentials}`,
    "Content-Type": "application/json"
  }

  const requestOptions = {
    method: 'GET',
    headers: headers
  }

  let response = []
  let nextPage = url

  await delay(10000)
  try {
    while (nextPage) {
      const data = await fetchWithRetries(url, requestOptions)

      if (!data.results) {
        throw new Error('Hubo un problema al obtener cuentas')
      }

      response = response.concat(data.results)
      nextPage = data.next
    }
    return {
      ok: true ,
      accounts: response
    }
  } catch(error) {
    return {
      ok: false,
      message: error.message || error
    }
  }
}
