'use server'

export const getTransactionsByAccount = async(linkId, accountId) => {
  const url = `${process.env.BELVO_BASE_URL}/api/transactions/?link=${linkId}&account=${accountId}`
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
    transactions: response
  }
}
