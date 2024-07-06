import CommandMenu from '@/components/dashboard/CommandMenu'
import CreateProduct from '@/components/dashboard/CreateProduct'
import { ModeToggle } from '@/components/Mode-Toggle'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import useProducts from '@/hooks/useProducts'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/products/create')({
  component: ProductCreateRoute
})

function ProductCreateRoute() {
  const { setProducts } = useProducts()

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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to='/admin/dashboard/products/create' className='hover:text-foreground' >Create Product</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center flex-shrink-0 align-middle gap-5">
          <CommandMenu />
          <ModeToggle />
        </div>
      </header>
      <section className='mt-5 mb-10'>
        <h1 className='text-[1.5rem] sm:text-[1.75rem]'>Create a new Product <Badge className='align-top'>New</Badge></h1>
        <p className='text-[.8rem] text-muted-foreground'>You can create here a new product.</p>
      </section>
      <hr className='mb-5 w-full md:w-3/4 lg:w-1/2' />
      <section className='w-full md:w-3/4 lg:w-1/2'>
        <CreateProduct setProducts={setProducts} />
      </section>
    </>
  )
}