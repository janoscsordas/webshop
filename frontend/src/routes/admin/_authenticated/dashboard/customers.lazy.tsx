import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/customers')({
  component: () => <div>Hello /admin/_authenticated/dashboard/customers!</div>
})