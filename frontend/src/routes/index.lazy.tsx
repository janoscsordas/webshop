import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

import selectionImage from "@/assets/selection.svg"
import { Button } from '@/components/ui/button'
import Footer from '@/components/webshop/Footer'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-dvh pt-[5rem] px-5'>
                <h1 className='text-[2rem] text-center'>Ryan Webshop Helps You <br /> <span className='font-bold'>Get The Best Products</span></h1>
                <div className='flex flex-col md:flex-row gap-10 md:gap-10 justify-between items-center mt-20'>
                    <div className='flex-1'>
                        <h2 className='text-[2rem] font-bold'>Browse our products</h2>
                        <p className='text-gray-500 w-[85%]'>Find the right product for you, or ask for a custom build down below. We are here to help you.</p>
                        <Link to=""><Button className='mt-5'>Browse Products</Button></Link>
                    </div>
                    <div className='flex-1'>
                        <img src={selectionImage} alt="Select your product" className='w-[65%] h-[65%] block mx-auto md:ml-auto' />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
