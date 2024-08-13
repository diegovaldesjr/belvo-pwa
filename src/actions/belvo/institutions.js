'use server'

import { fetchWithTimeout } from "@/helpers"

export const getInstitutions = async() => {
  const url = `${process.env.BELVO_BASE_URL}/api/institutions/`
  const username = process.env.BELVO_SECRET_ID
  const password = process.env.BELVO_SECRET_PASSWORD
  const credentials = btoa(`${username}:${password}`)

  const headers = {
    'Authorization': `Basic ${credentials}`,
    "Content-Type": "application/json"
  }

  const HTTP_TIMEOUT = 3000

  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  try {
    const request = await fetchWithTimeout(url, requestOptions, HTTP_TIMEOUT)
    const response = await request.json()
    
    if (!response?.results) {
      throw 'Hubo un problema al obtener instituciones'
    }

    return {
      ok: true ,
      institutions: response.results
    }
  } catch(error) {
    return {
      ok: false,
      message: error
    }
  }
}

export const getInstitutionById = async(id) => {
  const url = `${process.env.BELVO_BASE_URL}/api/institutions/${id}`
  const username = process.env.BELVO_SECRET_ID
  const password = process.env.BELVO_SECRET_PASSWORD
  const credentials = btoa(`${username}:${password}`)

  const headers = {
    'Authorization': `Basic ${credentials}`,
    "Content-Type": "application/json"
  };

  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  try {
    const request = await fetch(url, requestOptions)
    const response = await request.json()
    
    if (!response?.id) {
      throw 'Hubo un problema al obtener institucion'
    }

    return {
      ok: true ,
      institution: response
    }
  } catch(error) {
    return {
      ok: false,
      message: error
    }
  }
}
