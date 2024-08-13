import { AccountsDetail } from "./ui/AccountsDetail"

export default async function AccountsPage({params}) {
  const id = params.id

  return (
    <AccountsDetail id={id}/>
  )
}
