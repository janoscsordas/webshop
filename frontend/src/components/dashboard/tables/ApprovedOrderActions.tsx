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

import { type ApprovedOrder, removeApprovedOrderHandler } from "@/lib/orders/orders"
import { useState } from "react";


interface OrderActionsProps {
    order: ApprovedOrder;
    setApprovedOrders: React.Dispatch<React.SetStateAction<ApprovedOrder[]>>
}

const ApprovedOrderActions: React.FC<OrderActionsProps> = ({ order, setApprovedOrders }) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleApprovedOrderRemoval = async (id: string) => {
        setSuccess(false)
        setError("")
        const res = await removeApprovedOrderHandler(id)

        if (typeof res == "string") {
            setError(res)
            return
        }
        
        setApprovedOrders(prevApprovedOrders => prevApprovedOrders.filter(order => String(order.id) != id))
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
                        <DropdownMenuLabel>Actions on approved order ID <strong>{order.id}</strong></DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to remove this approved order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once it's done there's no going back.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleApprovedOrderRemoval(String(order.id))}>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default ApprovedOrderActions