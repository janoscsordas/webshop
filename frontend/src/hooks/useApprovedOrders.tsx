import { useQuery } from "@tanstack/react-query"
import { useState, useEffect, useMemo } from "react"
import { getAllApprovedOrders, type ApprovedOrder } from "@/lib/orders/orders"

const useApprovedOrders = () => {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["approved-orders"],
        queryFn: getAllApprovedOrders
    })

    const [approvedOrders, setApprovedOrders] = useState<ApprovedOrder[]>([])
    const [filteredApprovedOrders, setFilteredApprovedOrders] = useState<ApprovedOrder[]>([])

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    // useEffect for setting the approvedOrders state
    useEffect(() => {
        if (data?.error) return 

        if (data?.approvedOrders) {
            setApprovedOrders(data.approvedOrders)
        }
    }, [data])

    // useEffect for setting up the filtered approvedOrders state
    useEffect(() => {
        setFilteredApprovedOrders(approvedOrders.filter(order => order.email.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [approvedOrders, searchTerm])

    // useMemo for sorting the approvedOrders
    const sortedApprovedOrders = useMemo(() => {
        if (!data) return []
        let sortableOrders = [...filteredApprovedOrders]
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
    }, [filteredApprovedOrders, sortConfig])

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

    return { isPending, isError, error, approvedOrders, setApprovedOrders, sortedApprovedOrders, searchTerm, setSearchTerm, requestSort }
}

export default useApprovedOrders