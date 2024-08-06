import { useState, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllCustomers, type Customer } from "@/lib/customers/customers"

const useCustomers = () => {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["customers"],
        queryFn: getAllCustomers,
    })

    // state for the products
    const [customers, setCustomers] = useState<Customer[]>([])
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
    // sorting functions and states
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")

    // useEffect for setting the products state
    useEffect(() => {
        if (data?.error) return 

        if (data?.customers) {
            setCustomers(data.customers)
        }
    }, [data])

    // useEffect for setting up the filtered products state
    useEffect(() => {
        setFilteredCustomers(customers.filter(customer => customer.email.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [customers, searchTerm])

    // useMemo for sorting the products
    const sortedCustomers = useMemo(() => {
        if (!data) return []
        let sortableProducts = [...filteredCustomers]
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
    }, [filteredCustomers, sortConfig])

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

    return { isPending, isError, error, customers, setCustomers, sortedCustomers, searchTerm, setSearchTerm, requestSort }
}

export default useCustomers