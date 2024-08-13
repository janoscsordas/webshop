import { api } from '@/lib/api'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'

export async function isAuthenticated() {
  const res = await api.admin["me"].$get()
  if (!res.ok) {
    return false
  }
  const data = await res.json()
  return data.success
}

function DashBoardContent () {

  return (
    <>
      <main className='flex font-geist'>
        <DashboardNavbar />
        <section className='w-full min-h-dvh bg-secondary pl-[5rem] pr-6 py-6'>
          <Outlet />
        </section>
      </main>

    </>
  )
}

export const Route = createFileRoute('/admin/_authenticated')({
  beforeLoad: async ({ location }) => {
    const auth = await isAuthenticated()
    if (!auth) {
      throw redirect({
        to: "/admin/login",
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: DashBoardContent
})
