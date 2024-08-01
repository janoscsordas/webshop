import { useQuery } from "@tanstack/react-query"
import { useState, useEffect, useMemo } from "react"
import { getAllOrders, type Order } from "@/lib/orders/orders"

const useOrders = () => {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders
    })

    const [orders, setOrders] = useState<Order[]>([])
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    // useEffect for setting the products state
    useEffect(() => {
        if (data?.error) return 

        if (data?.orders) {
            setOrders(data.orders)
        }
    }, [data])

    // useEffect for setting up the filtered products state
    useEffect(() => {
        setFilteredOrders(orders.filter(order => order.email.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [orders, searchTerm])

    // useMemo for sorting the products
    const sortedOrders = useMemo(() => {
        if (!data) return []
        let sortableOrders = [...filteredOrders]
        if (sortConfig !== null) {
            sortableOrders.sort((a: any, b: any) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "asc" ? 1 : -1
                }
                return 0
            })
        }
        return sortableOrders
    }, [filteredOrders, sortConfig])

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

    return { isPending, isError, error, orders, setOrders, sortedOrders, searchTerm, setSearchTerm, requestSort }
}

export default useOrders