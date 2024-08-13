import Image from "next/image";
import { BiSolidInstitution } from "react-icons/bi";

export const Card = ({name, imageUrl, country}) => {
  return (
    <div className="flex flex-col justify-center items-center rounded-xl shadow-lg p-8 cursor-pointer bg-white hover:bg-violet-50">
      {
        imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover"
            width={ 100 }
            height={ 100 }
            priority
          />
        ) : (
          <BiSolidInstitution className="w-20 h-20"/>
        )
      }
      
      <h3 className="font-semibold mt-2">{name}</h3>
      <span className="font-light">{country}</span>
    </div>
  )
}
