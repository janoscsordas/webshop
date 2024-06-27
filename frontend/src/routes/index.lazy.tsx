import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
    return (
        <div className='p-2 bg-background'>
            <h1>Welcome Home!</h1>
        </div>
    )
}