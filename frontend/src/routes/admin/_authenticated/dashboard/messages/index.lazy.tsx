import CommandMenu from '@/components/dashboard/CommandMenu'
import { ModeToggle } from '@/components/Mode-Toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/messages/')({
  component: MessagesPage
})

function MessagesPage() {
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
              <Link to='/admin/dashboard/messages' className='hover:text-foreground' >Messages</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center flex-shrink-0 align-middle gap-5">
          <CommandMenu />
          <ModeToggle />
        </div>
      </header>
    </>
  )
}