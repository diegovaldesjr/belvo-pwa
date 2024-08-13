'use client'

import clsx from "clsx"
import Link from "next/link"
import { registerUser } from "@/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const RegisterForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [pending, setPending] = useState(false)
  const {register, handleSubmit, formState: {errors}} = useForm()

  const textContent = {
    email: 'Correo electrónico',
    password: 'Contraseña',
    repeatPassword: 'Repetir contraseña',
    login: 'Ingresar',
    btnText: 'Crear cuenta'
  }

  const onSubmit = async(data) => {
    setErrorMessage('')
    setPending(true)
    const {email, password, repeatPassword} = data

    if (password !== repeatPassword) {
      setErrorMessage('Las contraseñas no coinciden.')
      setPending(false)
      return
    }
    const res = await registerUser(email, password)
    
    if (!res.ok) {
      setErrorMessage(res.message)
      setPending(false)
      return
    }
    router.replace('/auth/login')
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="email">{textContent.email}</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email" 
        {...register('email', {required: true, pattern: '^[^@]+@[^@]+\.[a-zA-Z]{2,}$' })}
      />

      <label htmlFor="password">{textContent.password}</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.password
            }
          )
        }
        type="password"
        {...register('password', {required: true, minLength: 6})}
      />

      <label htmlFor="password">{textContent.repeatPassword}</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.password
            }
          )
        }
        type="password"
        {...register('repeatPassword', {required: true, minLength: 6})}
      />

      <span className="text-red-500">{errorMessage}</span>

      <button
        type='submit'
        className={
          clsx({
            "btn-primary": !pending,
            "btn-disabled": pending
          })
        }
        disabled={pending}
      >
        {textContent.btnText}
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login" 
        className="btn-secondary text-center">
        {textContent.login}
      </Link>

    </form>
  )
}
