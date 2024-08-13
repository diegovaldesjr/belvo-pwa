'use server'

import { fetchWithTimeout } from "@/helpers"

export const getLink = async(name) => {
  const url = `${process.env.BELVO_BASE_URL}/api/links/`
  const username = process.env.BELVO_SECRET_ID
  const password = process.env.BELVO_SECRET_PASSWORD
  const credentials = btoa(`${username}:${password}`)

  const headers = {
    'Authorization': `Basic ${credentials}`,
    "Content-Type": "application/json"
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
    const request = await fetchWithTimeout(url, requestOptions)
    const response = await request.json()
    
    if (!response?.id) {
      throw 'Hubo un problema al obtener link'
    }

    return {
      ok: true ,
      link: response
    }
  } catch(error) {
    return {
      ok: false,
      message: error
    }
  }
}
