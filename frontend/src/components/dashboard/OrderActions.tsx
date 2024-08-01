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

import { removeOrderHandler, type Order } from "@/lib/orders/orders"

interface OrderActionsProps {
    order: Order;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

const OrderActions: React.FC<OrderActionsProps> = ({ order, setOrders }) => {

    const handleProductRemove = async (id: string) => {
        const res = await removeOrderHandler(id)

        if (typeof res == "string") {
            throw new Error(res)
        }

        if (res.success) {
            setOrders(prevOrders => prevOrders.filter(order => String(order.id) != id))
        }
    }

    const handleApproveOrder = async (id: string) => {

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
                        <DropdownMenuItem className="text-green-600">Approve Order</DropdownMenuItem>
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
                        <AlertDialogAction onClick={() => handleProductRemove(String(order.id))}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default OrderActions