import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About
})

function About() {
    return (
        <div className='p-2'>
            <h1>Hello from about!</h1>
        </div>
    )
}