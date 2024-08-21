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
import { useToast } from "@/components/ui/use-toast";
import AlertMessage from "../AlertMessage";


interface OrderActionsProps {
    order: Order;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

const OrderActions: React.FC<OrderActionsProps> = ({ order, setOrders }) => {
    const [error, setError] = useState("")

    const { toast } = useToast()

    const handleOrderRemove = async (id: string) => {
        setError("")
        const res = await removeOrderHandler(id)

        if (typeof res == "string") {
            setError(res)
            return
        }

        setOrders(prevOrders => prevOrders.filter(order => String(order.id) != id))
        toast({
            title: "Order removed",
            description: "The order no. " + id + " has been removed successfully.",
            duration: 4000
        })
    }

    const handleApproveOrder = async (id: string, email: string, product: string, price: number, orderDate: string) => {
        setError("")

        const res = await approveOrder(id, email, product, price, orderDate)

        if (typeof res == "string") {
            setError(res)
            return
        }

        setOrders(prevOrders => prevOrders.filter(order => String(order.id) != id))
        toast({
            title: "Order approved",
            description: "The order no. " + id + " has been approved successfully.",
            duration: 4000
        })
    }

    return (
        <>
            {error && <AlertMessage Title="Error" message={error} className="absolute top-50 left-50 -translate-x-[50%] -translate-y-[50%]" variant="destructive" />}
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
