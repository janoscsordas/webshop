import CommandMenu from '@/components/dashboard/CommandMenu'
import CustomerTable from '@/components/dashboard/tables/CustomerTable'
import { ModeToggle } from '@/components/Mode-Toggle'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/customers/')({
  component: CustomersPage
})


function CustomersPage() {

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
              <Link to='/admin/dashboard/customers' className='hover:text-foreground' >Customers</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center flex-shrink-0 align-middle gap-5">
          <CommandMenu />
          <ModeToggle />
        </div>
      </header>
      <section className='mt-5 mb-10 flex justify-between items-center'>
        <h1 className='text-[1.5rem] sm:text-[1.75rem]'>Customers registered to the Webshop <Badge className='align-top'>New</Badge></h1>
      </section>
      <section className='grid'>
        <CustomerTable />
      </section>
    </>
  )
}