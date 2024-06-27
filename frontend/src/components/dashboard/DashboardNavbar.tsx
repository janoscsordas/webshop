import { useContext } from 'react'
import { AdminUserContext } from '@/context/AdminUserContext'
import { Home, LogOut, Package, Package2, Settings, ShoppingCart, UsersRound } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { api } from '@/lib/api'
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

const DashboardNavbar: React.FC = () => {
    const userContext = useContext(AdminUserContext)
    const userEmail = localStorage.getItem("email")
    if (!userContext) {
        throw new Error("User context not found")
    }

    const handleLogout = async () => {
        const res = await api.admin.logout.$get()

        if (!res.ok) {
            return
        }
        
        localStorage.removeItem("email")
        userContext.setUserEmail("")

        window.location.reload()
    }

    return (
        <>
            <aside className="inset-0 fixed overflow-y-scroll no-scrollbar w-max h-screen p-2 bg-background flex flex-col justify-between items-center">
                <nav className='flex flex-col items-center gap-4 px-1 sm:py-5'>
                    <Link 
                        to="/admin/dashboard" 
                        className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'>
                            <Package2 className='w-5 h-5 transition-all group-hover:scale-110 group-hover:rotate-12' />
                            <span className='sr-only'>Ryan Dashboard</span>
                    </Link>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link
                            to="/admin/dashboard"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            <Home className={`h-5 w-5`} />
                            <span className="sr-only">Home</span>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Home</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link
                            to="/admin/dashboard/products"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            {({ isActive }) => {
                                return (
                                    <>
                                        <Package className={`h-5 w-5 ${isActive ? "text-foreground" : ""}`} />
                                        <span className="sr-only">Products</span>
                                    </>
                                )
                            }}
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link
                            to="/admin/dashboard/orders"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            {({ isActive }) => {
                              return (
                                <>
                                    <ShoppingCart className={`h-5 w-5 ${isActive ? "text-foreground" : ""}`} />
                                    <span className="sr-only">Orders</span>
                                </>
                              )  
                            }}
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link
                            to="/admin/dashboard/customers"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            {({ isActive }) => {
                                return (
                                    <>
                                        <UsersRound className={`h-5 w-5 ${isActive ? "text-foreground" : ""}`} />
                                        <span className="sr-only">Customers</span>
                                    </>
                                )
                            }}
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Customers</TooltipContent>
                    </Tooltip>
                </nav>
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='w-5 h-5 sm:mb-5'>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Settings className='align-middle h-5 w-5 text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer' />
                                </TooltipTrigger>
                                <TooltipContent side="right">Settings</TooltipContent>
                            </Tooltip>
                            </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My account: {userContext.userEmail || userEmail}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to log out? You will have to log in again.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} >Log out</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
            </aside>
        </>
    )
}

export default DashboardNavbar