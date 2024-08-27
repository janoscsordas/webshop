import useProducts from "@/hooks/useProducts";
import AlertMessage from "../dashboard/AlertMessage"
import { Skeleton } from "../ui/skeleton"
import { handleAddingToCart, Product } from "@/lib/products/products";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import useCart from "@/hooks/useCart";

type ProductGroupedByCategory = {
    [key: string]: Product[];
};

function ProductsByCategoriesList() {
    const { isPending, isError, error, sortedProducts, requestSort } = useProducts();
    const { addToCart } = useCart()

    if (isError) {
        return (
            <AlertMessage message={error?.message} Title="Error" variant="destructive" />
        )
    }

    const groupedProducts: ProductGroupedByCategory = sortedProducts.reduce((acc: ProductGroupedByCategory, product: Product) => {
        if (!acc[product.categoryName]) {
            acc[product.categoryName] = [];
        }

        acc[product.categoryName].push(product)
        return acc
    }, {} as ProductGroupedByCategory)

    return (
        <>
            {isPending ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[85%] mx-auto gap-8">
                        <Skeleton className="w-full h-[300px] rounded-sm" />
                        <Skeleton className="w-full h-[300px] rounded-sm" />
                        <Skeleton className="w-full h-[300px] rounded-sm" />
                        <Skeleton className="w-full h-[300px] rounded-sm" />
                    </div>
                </>
            ) : (
                <>
                    {Object.keys(groupedProducts).map((categoryName, index) => (
                        <Carousel key={index} opts={{
                            align: "start",
                            }}
                            className="w-[85%] mx-auto">
                            <h2 className="text-[1.25rem] my-2">{categoryName}</h2>
                            <CarouselContent>
                                {groupedProducts[categoryName].map((product) => (
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                                        <div className="p-1">
                                            <Card className="z-1 h-[225px] select-none" key={product.id}>
                                                <CardContent className="flex flex-col justify-between h-full p-6">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-semibold">{product.productName}</span>
                                                        <span>{product.inStock == "Yes" ? <Check className="text-green-500" /> : <X className="text-red-500" />}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-green-600 font-bold">${product.productPrice}</span>
                                                        <Button onClick={() => addToCart(product)}>Add to cart</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    ))}
                </>
            )}
        </>
    )
}

export default ProductsByCategoriesList
