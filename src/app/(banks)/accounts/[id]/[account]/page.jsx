import { TransactionsDetail } from "./ui/TransactionsDetail"


export default async function({params}) {
  const id = params.account
  console.log(id)

  return (
    <TransactionsDetail id={id}/>
  )
}
