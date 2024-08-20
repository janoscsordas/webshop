import { ModeToggle } from '@/components/Mode-Toggle'
import UserRegistrationForm from '@/lib/userControllers/UserRegistrationForm'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/signup')({
  component: RegisterPage
})

function RegisterPage() {
    return (
        <main className='grid place-items-center w-full min-h-dvh font-geist'>
            <div className="absolute block w-fit h-fit top-5 left-5">
                <Link to="/" className="text-[.85rem] text-gray-500 hover:underline hover:text-gray-400">Go back</Link>
            </div>
            <div className="absolute block w-fit h-fit top-5 right-5">
                <ModeToggle />
            </div>
            <div>
                <h1 className='text-center text-[1.25rem] font-bold'>Register an account</h1>
                <p className='text-gray-500 text-center text-[.75rem]'>Enter your email and password to register</p>
                <UserRegistrationForm />
            </div>
        </main>
    )
}
