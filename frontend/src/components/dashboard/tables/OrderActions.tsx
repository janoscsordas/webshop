import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
  
import { MoreHorizontal } from "lucide-react"

import { approveOrder, removeOrderHandler, type Order } from "@/lib/orders/orders"
import { useState } from "react";


interface OrderActionsProps {
    order: Order;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

const OrderActions: React.FC<OrderActionsProps> = ({ order, setOrders }) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleOrderRemove = async (id: string) => {
        setSuccess(false)
        setError("")
        const res = await removeOrderHandler(id)

        if (typeof res == "string") {
            setError(res)
            return
        }
        
        setOrders(prevOrders => prevOrders.filter(order => String(order.id) != id))
        setSuccess(true)
    }

    const handleApproveOrder = async (id: string, email: string, product: string, price: number, orderDate: string) => {
        setSuccess(false)
        setError("")

        const res = await approveOrder(id, email, product, price, orderDate)

        if (typeof res == "string") {
            setError(res)
            return
        }

        setOrders(prevOrders => prevOrders.filter(order => String(order.id) != id))
        setSuccess(true)
    }

    return (
        <>
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center">
                        <MoreHorizontal className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions on order ID <strong>{order.id}</strong></DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-600" onClick={() => handleApproveOrder(String(order.id), order.email, order.product, order.price, order.orderDate)}>Approve Order</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to remove this order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once it's done there's no going back.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleOrderRemove(String(order.id))}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default OrderActions