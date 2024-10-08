'use server'

import { fetchWithRetries } from "@/helpers"

export const getLink = async(name) => {
  const url = `${process.env.BELVO_BASE_URL}/api/links/`
  const username = process.env.BELVO_SECRET_ID
  const password = process.env.BELVO_SECRET_PASSWORD
  const credentials = btoa(`${username}:${password}`)

  const headers = {
    'accept': 'application/json',
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json'
  }

  const body = JSON.stringify({
    "username": "bnk100",
    "password": "full",
    "institution": name,
    "access_mode": "recurrent"
  })

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body
  }

  try {
    const response = await fetchWithRetries(url, requestOptions)
    
    if (!response?.id) {
      throw new Error('Hubo un problema al obtener link')
    }

    return {
      ok: true ,
      link: response
    }
  } catch(error) {
    return {
      ok: false,
      message: error.message || error
    }
  }
}
