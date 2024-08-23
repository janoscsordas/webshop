import useProducts from "@/hooks/useProducts";
import AlertMessage from "../dashboard/AlertMessage"
import { Skeleton } from "../ui/skeleton"

function ProductsByCategoriesList() {
    const { isPending, isError, error, sortedProducts, requestSort } = useProducts();

    if (isError) {
        return (
            <AlertMessage message={error?.message} Title="Error" variant="destructive" />
        )
    }

    return (
        <>
            {isPending ? (
                <>
                    <div className="grid gap-8">
                        <Skeleton className="w-full h-[350px] rounded-sm" />
                        <Skeleton className="w-full h-[350px] rounded-sm" />
                        <Skeleton className="w-full h-[350px] rounded-sm" />
                        <Skeleton className="w-full h-[350px] rounded-sm" />
                    </div>
                </>
            ) : (
                <>
                    {sortedProducts && sortedProducts.map(product => {
                        
                    })}
                </>
            )}
        </>
    )
}

export default ProductsByCategoriesList
