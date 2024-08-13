import { AccountsDetail } from "./ui/AccountsDetail"

export default async function({params}) {
  const id = params.id

  return (
    <AccountsDetail id={id}/>
  )
}
