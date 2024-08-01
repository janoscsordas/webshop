import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_authenticated/dashboard/orders/approved-orders')({
  component: () => <div>Hello /admin/_authenticated/dashboard/orders/approved-orders!</div>
})