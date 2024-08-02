import CommandMenu from '@/components/dashboard/CommandMenu'
import ProductTable from '@/components/dashboard/tables/ProductTable'
import { ModeToggle } from '@/components/Mode-Toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createLazyFileRoute, Link } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/products/')({
  component: DashboardProducts
})

function DashboardProducts() {
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
              <Link to='/admin/dashboard/products' className='hover:text-foreground' >Products</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center flex-shrink-0 align-middle gap-5">
          <CommandMenu />
          <ModeToggle />
        </div>
      </header>
      <section className='mt-5 mb-10 flex justify-between items-center'>
        <h1 className='text-[1.5rem] sm:text-[1.75rem]'>Products in Database</h1>
      </section>
      <section className='grid'>
        <div className='flex gap-5 items-center'>
          <Card className='mb-5 flex-1'>
            <CardHeader>
              <CardTitle className='text-lg'>Create a new Product</CardTitle>
              <CardDescription className='text-[.8rem]'>By clicking the button below, You will be redirected to the product creation page.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/dashboard/products/create"><Button>Create Product</Button></Link>
            </CardContent>
          </Card>
        </div>
        <ProductTable />
      </section>
    </>
  )
}