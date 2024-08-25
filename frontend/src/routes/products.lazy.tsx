import Footer from '@/components/webshop/Footer'
import ProductsByCategoriesList from '@/components/webshop/ProductsByCategoriesList'
import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/products')({
  component: ProductsPage
})

function ProductsPage() {

    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-dvh px-5 pt-[5rem]'>
                <h1 className='text-[1.25rem] sm:text-[2rem] text-center mb-10 font-bold'>All Products by Categories</h1>
                <section className='w-full h-full'>
                    <ProductsByCategoriesList />
                </section>
            </main>
            <Footer />
        </>
    )
}
