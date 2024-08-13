'use server'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAccountsByLink = async(linkId) => {
  const url = `${process.env.BELVO_BASE_URL}/api/accounts/?link=${linkId}`
  const username = process.env.BELVO_SECRET_ID;
  const password = process.env.BELVO_SECRET_PASSWORD;
  const credentials = btoa(`${username}:${password}`);

  const headers = {
    'Authorization': `Basic ${credentials}`,
    "Content-Type": "application/json"
  }

  var requestOptions = {
    method: 'GET',
    headers: headers
  }

  let response = []
  let nextPage = url

  await delay(10000)

  while (nextPage) {
    try {
      const request = await fetch(nextPage, requestOptions)
      const data = await request.json()

      if (!data.results) {
        throw 'Hubo un problema al obtener cuentas'
      }

      response = response.concat(data.results)
      nextPage = data.next

    } catch(error) {
      return {
        ok: false,
        message: error
      }
    }
  }
  return {
    ok: true ,
    accounts: response
  }
}
