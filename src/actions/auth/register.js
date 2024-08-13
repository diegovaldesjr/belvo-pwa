'use server'

export const registerUser = async (email, password) => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/register/`
  
  const headers = {
    "Content-Type": "application/json"
  };
  
  const body = JSON.stringify({
    "email": email,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: body
  };

  try {
    const request = await fetch(url, requestOptions)
    const response = await request.json()

    if (!response?.id) {
      throw response.detail
    }

    return {
      ok: true 
    }
  } catch(error) {
    return {
      ok: false,
      message: error
    }
  }
}
