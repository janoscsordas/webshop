import Footer from '@/components/webshop/Footer'
import SearchProducts from '@/components/webshop/SearchProducts'
import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/search-product')({
  component: SearchProductPage
})

function SearchProductPage() {

    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-dvh pt-[5rem] font-geist'>
                <SearchProducts />
            </main>
            <Footer />
        </>
    )
}
