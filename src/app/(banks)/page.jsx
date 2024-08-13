import { CardsGrid } from "./ui/CardsGrid";

export default function Home() {
  const title = 'Instituciones'
  
  return (
    <>
      <div className="flex flex-col p-8 bg-gray-50">
        <h1 className={ "text-4xl mb-5 font-bold" }>{title}</h1>
        <CardsGrid />
      </div>

    </>
  );
}
