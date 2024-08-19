import { Link } from "@tanstack/react-router"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCircleIcon } from "lucide-react"
import { ModeToggle } from "../Mode-Toggle"

function WebshopNavbar() {
    return (
        <header className="fixed mx-auto flex justify-between items-center font-geist w-full h-fit py-4 px-5 bg-secondary">
            <nav className="flex items-center gap-12">
                <Link className="font-bold text-[1.25rem]">Ryan Webshop</Link>
                <div className="flex items-center gap-5">
                    <Link className="bg-background rounded-md px-4 py-[.5rem] hover:bg-accent transition-all duration-200">Home</Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-3 flex gap-3">
                                <Link className="hover:bg-accent rounded-sm p-4 w-[220px]">
                                    <h4 className="font-bold mb-1">Access All Products</h4>
                                    <span className="text-gray-500">Click to access all the products</span>
                                </Link>
                                <Link className="hover:bg-accent rounded-sm p-4 w-[220px]">
                                    <h4 className="font-bold mb-1">Search for a product</h4>
                                    <span className="text-gray-500">Click to begin searching for a specific product</span>
                                </Link>
                            </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Link className="bg-background rounded-md px-4 py-[.5rem] hover:bg-accent transition-all duration-200">About Us</Link>
                    <ModeToggle />
                </div>
            </nav>
            <div className="flex items-center gap-5">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarFallback className="bg-background"><UserCircleIcon /></AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default WebshopNavbar
