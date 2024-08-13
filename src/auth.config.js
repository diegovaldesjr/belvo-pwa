import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

const getJWTUser = async (email, password) => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/login/`
  
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

  const request = await fetch(url, requestOptions)
  const response = await request.json()

  if (response.access_token) return response
  return null
}

export const authConfig = {
  pages: {
    signIn: 'auth/login',
    newUser: 'auth/register'
  },
  callbacks: {
    jwt({token, user}) {
      // console.log({token, user})
      if (user) {
        token.data = user
      }
      return token
    },
    session({session, token, user}) {
      // console.log({session, token, user})
      session.user = token.data
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parseCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials)

        if (!parseCredentials.success) return null

        const {email, password} = parseCredentials.data

        //Validar usuario
        const userJWT = await getJWTUser(email, password)
        if (!userJWT) return null
        return userJWT
        // const {customer:user} = await getCustomerLogin(userJWT)
        
        // //retornar info de usuario
        // const { role, username, avatar_url, meta_data, _links, is_paying_customer, ...rest } = user
        // return rest
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
