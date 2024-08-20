import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { api } from '@/lib/api'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

async function isAuthenticated(): Promise<boolean> {
    const res = await api.me.$get()
    if (!res.ok) {
        return false
    }

    return true
}

export const Route = createFileRoute('/_profile')({
    beforeLoad: async () => {
        const auth: boolean = await isAuthenticated()
        if (!auth) {
            throw redirect({
              to: "/",
              search: {
                redirect: location.href
              }
            })
        }
    },
    component: ProfilePage
})

function ProfilePage() {

    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-dvh font-geist pt-[5rem] px-5'>
                <Outlet />
            </main>
        </>
    )
}
