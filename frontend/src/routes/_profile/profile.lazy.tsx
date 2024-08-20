import { Input } from '@/components/ui/input'
import { UserContext } from '@/context/UserContext'
import UpdatePasswordForm from '@/lib/userControllers/UpdatePasswordForm'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useContext } from 'react'

export const Route = createLazyFileRoute('/_profile/profile')({
  component: ProfilePage
})

function ProfilePage() {
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    if (!userContext) {
        navigate({ to: "/" })
    }
    const userEmail = localStorage.getItem("email")

    return (
        <>
            <h1 className='text-[1.25rem] font-bold mt-5'>Account Settings</h1>
            <p className='text-gray-500 mt-2'>Edit your account settings</p>
            <hr className='my-5 w-1/3' />
            <div className='flex flex-col w-[85%] md:w-1/3'>
                <h3 className='text-[.9rem] mb-2'>Your email address: </h3>
                <span className='text-[1rem] text-muted-foreground border border-border p-2 rounded-md'>{userEmail || userContext?.userEmail}</span>
                <p className='mt-2 text-[.8rem] text-gray-500'>This is the email you gave us upon registering.</p>
            </div>
            <div className='flex flex-col w-[85%] md:w-1/3 mt-6'>
                <h3 className='text-[.9rem] mb-2'>Change your password:</h3>
                <UpdatePasswordForm />
            </div>
        </>
    )
}
