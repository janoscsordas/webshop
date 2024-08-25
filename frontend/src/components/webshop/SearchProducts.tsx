import useProducts from "@/hooks/useProducts"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { handleAddingToCart } from "@/lib/products/products"
import { Skeleton } from "../ui/skeleton"

function SearchProducts() {
    const { sortedProducts, searchTerm, setSearchTerm, isPending } = useProducts()

    return (
        <>
            <section className="mt-10">
                <h1 className="text-[1.75rem] font-bold text-center">Search A Product</h1>
                <p className="text-center text-gray-500">Type in the product's name to filter the list</p>
                <Input
                    type="text"
                    placeholder="Search..."
                    className="mx-auto block w-[85%] sm:w-[60%] md:w-[33%] mt-5"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </section>
            <section className="w-[90%] mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto">
                {isPending ?
                    (
                        <>
                            <Skeleton className="w-full h-[180px] rounded-md" />
                            <Skeleton className="w-full h-[180px] rounded-md" />
                            <Skeleton className="w-full h-[180px] rounded-md" />
                            <Skeleton className="w-full h-[180px] rounded-md" />
                        </>
                    )
                :
                    (
                        sortedProducts.map((product) => (
                        <Card key={product.id} className="w-full mb-3">
                            <CardHeader className="flex justify-between items-center">
                                <h2 className="font-bold">{product.productName}</h2>
                                {product.inStock == "Yes" ? <span className="text-green-600">In Stock</span> : <span className="text-red-600">Out of Stock</span>}
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                                <p className="text-green-600">${product.productPrice}</p>
                                <Button onClick={() => handleAddingToCart(product.id)}>Add to cart</Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </section>
        </>
    )
}

export default SearchProducts
