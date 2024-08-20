import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
    return (
        <>
            <WebshopNavbar />
            <main className=''>

            </main>
        </>
    )
}
