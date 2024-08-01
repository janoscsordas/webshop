import AlertMessage from "./AlertMessage"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"

import TableLoading from "./TableLoading"

import OrderActions from "./OrderActions"
import useOrders from "@/hooks/useOrders"

// function for getting all orders with Hono RPC


const OrderTable: React.FC = () => {
    const { isPending, isError, error, setOrders, sortedOrders, searchTerm, setSearchTerm, requestSort } = useOrders();

    if (isError) {
      return <AlertMessage Error="Error" message={error?.message} />;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Search for an Order by email</CardTitle>
                    <CardDescription>Type in the customer's email to filter the list</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input type="text" className="sm:w-1/2 md:w-2/5 lg:w-2/6" name="search" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
                </CardContent>
            </Card>
            <Table className="border rounded-lg bg-background max-h-[75dvh] no-scrollbar">
                <TableHeader>
                    <tr>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("email")} >Customer's E-mail</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("product")} >Product</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("price")} >Price</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("orderDate")} >Order Date</TableHead>
                    <TableHead>Actions</TableHead>
                    </tr>
                </TableHeader>
                <TableBody>
                    {isPending ? (
                        <TableLoading />
                    ): (
                        sortedOrders.map(order => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>{order.product}</TableCell>
                                <TableCell>$ {order.price}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>
                                    <OrderActions order={order} setOrders={setOrders} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default OrderTable