import { auth } from "@/auth.config";
import { TopMenu } from "@/components";
import { redirect } from "next/navigation";

export default async function AccountsLayout({ children }) {
  const session = await auth()
    
  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <main className="min-h-screen">
      <TopMenu />
      { children }
    </main>
  )
}
