import ShoppingCartComponent from '@/components/webshop/ShoppingCartComponent'
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
                    <p className='text-gray-500 text-[.8rem]'>You can remove or add items from/to your cart</p>
                </div>
                <ShoppingCartComponent />
            </main>
        </>
    )
}
