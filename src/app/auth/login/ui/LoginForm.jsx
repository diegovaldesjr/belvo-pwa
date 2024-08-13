'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from "@/actions";
import Link from "next/link"
import clsx from 'clsx';
import { useEffect } from 'react';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  
  const textContent = {
    email: 'Correo electrónico',
    password: 'Contraseña',
    singup: 'Crear una nueva cuenta',
    error: 'Correo o contraseña incorrectos.'
  }

  useEffect(() => {
    if (state === 'Success')
      window.location.replace('/')
  }, [state])

  return (
    <form action={dispatch} className="flex flex-col">

      <label htmlFor="email">{textContent.email}</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email" name="email" />

      <label htmlFor="password">{textContent.password}</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password" name="password" />

      <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic="true">
        {state === 'Invalid credentials.' && (
          <div className="mb-2">
            <p className="text-sm text-red-500">{textContent.error}</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor line */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/register" 
        className="btn-secondary text-center">
        {textContent.singup}
      </Link>

    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button 
      className={
        clsx({
          "btn-primary": !pending,
          "btn-disabled": pending
        })
      } 
      disabled={pending}
      type='submit'
    >
      Ingresar
    </button>
  );
}
