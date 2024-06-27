import { createLazyFileRoute } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ModeToggle } from '@/components/Mode-Toggle'

import { Badge } from '@/components/ui/badge'
import CommandMenu from '@/components/dashboard/CommandMenu'
import { Link } from '@tanstack/react-router'
import DashboardHomeCards from '@/components/dashboard/DashboardHomeCards'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/')({
  component: DashboardHome
})

function DashboardHome() {

  return (
    <>
      <header className='flex justify-between items-center'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/admin/dashboard" className='hover:text-foreground'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center flex-shrink-0 align-middle gap-5">
          <CommandMenu />
          <ModeToggle />
        </div>
      </header>
      <section className='mt-5 mb-10 flex justify-between items-center'>
        <h1 className='text-[1.5rem] sm:text-[1.75rem]'>Dashboard Home <Badge className='align-top'>New</Badge></h1>
      </section>
      <section>
        <Card className='mb-5'>
          <CardHeader>
            <CardTitle className='text-lg'>Welcome aboard!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>This is the dashboard. You can see some statistics down there. Also you can manage our products and see orders, customers information and more.</p>
          </CardContent>
        </Card>
      </section>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 lg:gap-x-7'>
        <DashboardHomeCards />
        <Card className='mb-4'>
            <CardHeader>
            <div className='flex justify-between items-center'>
                <CardTitle className='text-[1rem]'>New Statistics will be available soon</CardTitle>
            </div>
            <CardDescription className='text-[.8rem]'>They are under development, stay tuned.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-lg font-semibold'>Soon...</p>
            </CardContent>
        </Card>
      </section>
    </>
  )
}