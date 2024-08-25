import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/shopping-cart')({
  component: ShoppingCartPage
})

function ShoppingCartPage() {

    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-dvh pt-[5rem] px-5 font-geist'>
                <div>
                    <h1 className='text-[1.25rem] font-bold'>Your Shopping Cart</h1>
                    <p className='text-gray-500 text-[.8rem]'>You can add or remove items from your cart</p>
                </div>

                <h3 className='mt-16'>You have no items in your cart.</h3>
            </main>
        </>
    )
}
