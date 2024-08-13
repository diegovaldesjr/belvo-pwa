'use client'

import { getInstitutions, getLink } from "@/actions"
import { Card, Spinner } from "@/components"
import Link from "next/link"
import { useEffect, useState } from "react"

export const CardsGrid = () => {
  const [institutions, setInstitutions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    async function getInstitutionsData() {
      const { institutions: allInstitutions } = await getInstitutions()
      
      setInstitutions(allInstitutions)
      setIsLoading(false)
    }

    getInstitutionsData()
  }, [])

  const handlerRedirect = async(institution) => {
    localStorage.setItem('institution', institution.display_name)
    const {ok, link} = await getLink(institution.name)

    if (ok) localStorage.setItem('link', link.id)
  }

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {
        institutions.map( institution => (
          <Link href={`/accounts/${institution.name}`} key={institution.name} onClick={() => handlerRedirect(institution)}>
            <Card name={institution.display_name} imageUrl={institution.icon_logo} country={institution.country_code}/>
          </Link>
        ))
      } 
    </div>
  )
}
