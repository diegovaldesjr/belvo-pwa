'use client'

import Link from "next/link"
import { logout } from "@/actions"

export const TopMenu = () => {
  const title = 'K2 PWA'

  return (
    <nav className="flex px-5 py-6 justify-between items-center w-full text-white bg-violet-800">
      <div>
        <Link href="/">
          <span className={"antialiased font-bold text-4xl"}>{title}</span>
        </Link>
      </div>

      <div className="flex items-center">
        <button className="mx-2" onClick={() => logout()}>
          Cerrar 
        </button>
      </div>
    </nav>
  )
}
