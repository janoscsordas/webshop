import CommandMenu from '@/components/dashboard/CommandMenu'
import OrderTable from '@/components/dashboard/OrderTable'
import { ModeToggle } from '@/components/Mode-Toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/orders/')({
  component: DashboardOrdersRoute
})

function DashboardOrdersRoute() {
  return (
    <>
      <header className='flex justify-between items-center'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/admin/dashboard" className='hover:text-foreground'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to='/admin/dashboard/orders' className='hover:text-foreground' >Orders</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center flex-shrink-0 align-middle gap-5">
          <CommandMenu />
          <ModeToggle />
        </div>
      </header>
      <section className='mt-5 mb-10 flex justify-between items-center'>
        <h1 className='text-[1.5rem] sm:text-[1.75rem]'>Orders from the Webshop</h1>
      </section>
      <section className='grid'>
        <OrderTable />
      </section>
    </>
  )
}