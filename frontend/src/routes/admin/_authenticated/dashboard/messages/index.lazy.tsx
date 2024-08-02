import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_authenticated/dashboard/messages/')({
  component: () => <div>Hello /admin/_authenticated/dashboard/messages/!</div>
})