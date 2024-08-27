import AlertMessage from "../AlertMessage"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"

import TableLoading from "./TableLoading"
import useCustomers from "@/hooks/useCustomers"


const CustomerTable: React.FC = () => {
    const { isPending, isError, error, sortedCustomers, searchTerm, setSearchTerm, requestSort } = useCustomers();

    if (isError) {
      return <AlertMessage Error="Error" message={error?.message} />;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Search for a customer by email</CardTitle>
                    <CardDescription>Type in the customer's email to filter the list</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input type="text" className="md:w-2/3 lg:w-2/4" name="search" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
                </CardContent>
            </Card>
            <Table className="border rounded-lg bg-background max-h-[75dvh] no-scrollbar">
                <TableHeader>
                    <tr>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("email")} >E-mail</TableHead>
                    </tr>
                </TableHeader>
                <TableBody>
                    {isPending ? (
                        <TableLoading />
                    ): (
                        sortedCustomers.map(customer => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.email}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default CustomerTable
