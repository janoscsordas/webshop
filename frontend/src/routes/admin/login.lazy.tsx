import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { ModeToggle } from '@/components/Mode-Toggle'
import { AdminLoginForm } from '@/lib/adminControllers/AdminLoginForm'

export const Route = createLazyFileRoute('/admin/login')({
  component: AdminLogin
})

function AdminLogin() {
    return (
        <main className='font-geist min-h-dvh w-full grid md:grid-cols-2'>
            <section className='bg-secondary flex flex-col justify-between'>
                <header className='flex items-center justify-between p-6'>
                    <h1 className='font-bold text-[1.5rem]'>Ryan Admin Dashboard</h1>
                    <ModeToggle />
                </header>
                <footer className='p-6'>
                    <p className='sm:block hidden font-semibold text-[1.1rem]'>Log in to the dashboard, where you can access everything you need.</p>
                </footer>
            </section>
            <section className='flex flex-col justify-center items-center relative'>
                <Link to="/" className='sm:block hidden absolute top-8 right-8 text-[.8rem] opacity-60 cursor-pointer hover:opacity-85'>Leave Page</Link>
                <h3 className="text-[1.25rem] font-bold">Log in to your account</h3>
                <p className="text-[.8rem] text-center opacity-60 mb-5">Log in with your given credentials to access the dashboard</p>
                <AdminLoginForm />
            </section>
        </main>
    )
}