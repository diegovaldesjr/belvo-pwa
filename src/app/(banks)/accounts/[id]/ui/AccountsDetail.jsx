'use client'

import { getAccountsByLink } from "@/actions"
import { Spinner } from "@/components"
import Link from "next/link"
import { useEffect, useState } from "react"

export const AccountsDetail = ({id}) => {
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const institutionName = localStorage.getItem('institution')
  const linkId = localStorage.getItem('link')

  useEffect(() =>{
    async function getAccounts() {
      //Obtener cuentas
      if (!linkId) {
        setIsLoading(false)
        return
      }

      const response = await getAccountsByLink(linkId)
      
      if(response.ok)
        setAccounts(response.accounts)

      setIsLoading(false)
    }

    getAccounts()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  const saveNameAccounts = (account) => {
    localStorage.setItem('account', account.name)
    localStorage.setItem('currency', account.currency)
  }
  
  return (
    <div className="flex flex-col bg-gray-50">
      <h1 className={ "text-4xl p-8 font-bold text-center" }>{institutionName}</h1>

      {
        accounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
            {
              accounts.map( account => (
                <div key={account.id} className="rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold">{account.name}</h3>
                  <hr className="my-4" />
                  <div className="flex justify-between mb-8">
                    <p><span className="font-semibold">Número:</span> {account.number}</p>
                    <p><span className="font-semibold">Moneda:</span> {account.currency}</p>
                  </div>
                  <Link href={`/accounts/${id}/${account.id}`} className="text-blue-600" onClick={() => saveNameAccounts(account)}>
                    Ver transacciones
                  </Link>
                </div>
              ))
            }
          </div>
        ) : (
          <span className="w-full text-center">No hay cuentas registradas.</span>
        )
      }
    </div>
  )
}
