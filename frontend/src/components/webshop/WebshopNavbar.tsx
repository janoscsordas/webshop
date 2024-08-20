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
import { HamIcon, MenuIcon, UserCircleIcon } from "lucide-react"
import { ModeToggle } from "../Mode-Toggle"
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { api } from "@/lib/api"
import { Button } from "../ui/button"

function WebshopNavbar() {
    const userContext = useContext(UserContext)
    const [error, setError] = useState<string>("")


    const logoutHandler = async () => {
        const res = await api.logout.$get()

        if (!res.ok) {
            const errorData = await res.json()
            setError(errorData.message)
        }

        localStorage.removeItem("user-email")
        userContext?.setUserEmail("")

        window.location.reload()
    }

    return (
        <>
            {error &&
                <div className="w-full h-dvh fixed inset-0">
                    <div className="w-[350px] h-[225px] flex flex-col justify-between text-destructive border border-destructive rounded-sm absolute bg-background inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5">
                        <div>
                            <h2 className="text-2xl font-bold">Error:</h2>
                            <p>{error}</p>
                        </div>
                        <Button className="ml-auto block" onClick={() => window.location.reload()}>Try again</Button>
                    </div>
                </div>
            }
            <header className="fixed mx-auto flex justify-between items-center font-geist w-full h-fit py-4 px-5 bg-navColor backdrop-blur-md">
                <nav className="flex items-center gap-12">
                    <Link className="font-bold text-[1rem] align-top">Ryan Webshop</Link>
                    <div className="hidden items-center gap-5 md:flex">
                        <Link className="rounded-md px-4 py-[.5rem] hover:bg-accent transition-all duration-200" to="/">Home</Link>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent">Products</NavigationMenuTrigger>
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
                        <Link className="rounded-md px-4 py-[.5rem] hover:bg-accent transition-all duration-200">About Us</Link>
                        <ModeToggle />
                    </div>
                    <div className="md:hidden block w-[1.5rem] h-[1.5rem]">
                    <DropdownMenu>
                        <DropdownMenuTrigger><MenuIcon /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Menu</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link to="/"><DropdownMenuItem>Home</DropdownMenuItem></Link>
                            <Link><DropdownMenuItem>All Products</DropdownMenuItem></Link>
                            <Link><DropdownMenuItem>Search Products</DropdownMenuItem></Link>
                            <Link to="/about"><DropdownMenuItem>About Us</DropdownMenuItem></Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                            {userContext?.userEmail ? (
                                <>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                                    <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuLabel>You are not logged in</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to="/login"><DropdownMenuItem>Log in</DropdownMenuItem></Link>
                                    <Link to="/signup"><DropdownMenuItem>Sign up</DropdownMenuItem></Link>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </>
    )
}

export default WebshopNavbar
