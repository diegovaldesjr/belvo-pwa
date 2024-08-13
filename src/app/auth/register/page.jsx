import { RegisterForm } from './ui/RegisterForm';

export default function Register() {
  const title = 'Nueva cuenta'
  
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ "text-4xl mb-5 font-bold" }>{title}</h1>

      <RegisterForm />
    </div>
  );
}