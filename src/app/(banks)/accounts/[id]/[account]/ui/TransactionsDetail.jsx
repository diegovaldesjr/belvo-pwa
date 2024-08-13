'use client'

import { getTransactionsByAccount } from "@/actions"
import { Spinner } from "@/components"
import { useEffect, useState } from "react"

export const TransactionsDetail = ({id}) => {
  const [transactions, setTransactions] = useState([])
  const [kpi, setKPI] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const accountName = localStorage.getItem('account')
  const linkId = localStorage.getItem('link')

  useEffect(() =>{
    async function getTransactions() {
      //Obtener transacciones
      const {transactions: allTransactions} = await getTransactionsByAccount(linkId, id)

      if (allTransactions.length === 0) {
        setIsLoading(false)
        return
      }

      allTransactions.sort((a, b) => new Date(a.accounting_date) - new Date(b.accounting_date));
      setTransactions(allTransactions)

      //Calcular KPI
      const balance = allTransactions.reduce((total, transaction) => {
        if (transaction.type === 'INFLOW') {
          return total + transaction.amount;
        }
        return total - transaction.amount;
      }, 0)
      setKPI(balance)

      setIsLoading(false)
    }

    getTransactions()
  }, [])

  const formatCurrency = (value) => {
    const currency = localStorage.getItem('currency')
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency,
    }).format(value);
  }

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-gray-50">
      <h1 className={ "text-4xl p-8 pb-4 font-bold text-center" }>{accountName}</h1>
      <span className="mb-8 text-center">Balance: {formatCurrency(kpi)}</span>

      {
        transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Detalle</th>
                  <th className="p-4">Monto</th>
                  <th className="p-4">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {
                  transactions.map(transaction => (
                    <tr key={transaction.id} className="bg-white hover:bg-gray-50 cursor-pointer border" onClick={() => handlerRedirect()}>
                      <td className="p-4">{transaction.accounting_date}</td>
                      <td className="p-4">{transaction.description}</td>
                      <td className="p-4">{transaction.amount}</td>
                      <td className="p-4">{ transaction.type === 'INFLOW' ? 'Ingreso' : 'Egreso' }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <span className="w-full text-center">No hay transacciones registradas.</span>
        )
      }
    </div>
  )
}
