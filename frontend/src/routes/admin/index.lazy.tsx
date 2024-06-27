import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createLazyFileRoute('/admin/')({
  component: AdminRoute 
})

function AdminRoute() {

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Link to="/admin/login"><Button>Continue to log in page</Button></Link>
    </div>
  )
}