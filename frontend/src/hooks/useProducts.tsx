import { useState, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts, type Product } from "../lib/products/products"

const useProducts = () => {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    })

    // state for the products
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const [groupedProducts, setGroupedProducts] = useState([])
    // sorting functions and states
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    // useEffect for setting the products state
    useEffect(() => {
        if (data?.error) return

        if (data?.products) {
            setProducts(data.products)
        }
    }, [data])

    // useEffect for setting up the filtered products state
    useEffect(() => {
        setFilteredProducts(products.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [products, searchTerm])

    // useMemo for sorting the products
    const sortedProducts = useMemo(() => {
        if (!data) return []
        let sortableProducts = [...filteredProducts]
        if (sortConfig !== null) {
            sortableProducts.sort((a: any, b: any) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1
                }
                return 0
            })
        }
        return sortableProducts
    }, [filteredProducts, sortConfig])

    // sort requester function
    const requestSort = (key: string) => {
        let direction: "asc" | "desc" = "asc"
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }

    return { isPending, isError, error, products, setProducts, sortedProducts, searchTerm, setSearchTerm, requestSort }
}

export default useProducts
