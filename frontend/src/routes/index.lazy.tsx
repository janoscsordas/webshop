import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-dvh pt-[5rem]'>
                <h1 className='text-[2rem] text-center'>Ryan Webshop Helps You <br /> <span className='font-bold'>Get The Best Products</span></h1>
            </main>
        </>
    )
}
