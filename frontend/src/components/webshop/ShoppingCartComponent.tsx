import useCart from "@/hooks/useCart";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products/products";
import { useToast } from "../ui/use-toast";
import { createNewOrderHandler, CreateOrder } from "@/lib/orders/orders";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

const ShoppingCartComponent = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const { toast } = useToast()

    const userContext = useContext(UserContext)

    const [success, setSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const placeOrder = async (cart: Product[]) => {
        setIsPending(true)
        setSuccess(false)

        if (!userContext?.userEmail) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please login to place order"
            })
            setIsPending(false)
            return
        }

        if (!cart) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Your cart is empty!"
            })
            setIsPending(false)
            return
        }

        const order: CreateOrder[] = cart.map((item) => {
            return {
                email: userContext.userEmail,
                product: item.productName,
                price: item.productPrice
            }
        })

        if (!order) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error while trying to place order"
            })
            setIsPending(false)
            return
        }

        const result = await createNewOrderHandler(order, userContext.userEmail)

        if (typeof result == "string") {
            toast({
                variant: "destructive",
                title: "Error",
                description: result
            })
            setIsPending(false)
            return
        }

        toast({
            title: "Success",
            description: "Your order has been placed successfully!"
        })
        setIsPending(false)
        clearCart()
    }

    return (
        <>
            {cart.length === 0 ? (
                <h3 className="mt-16">Your shopping cart is empty.</h3>
            ) : (
                <>
                    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cart.map((product, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <span>{product.productName}</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-600 font-bold">${product.productPrice}</span>
                                        <Button onClick={() => removeFromCart(product.id)}>Remove from cart</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="flex flex-row-reverse justify-between items-center">
                        <Button onClick={() => clearCart()} title='Click to clear the cart'>Clear Cart</Button>
                        <span>Total: ${cart.reduce((total, product) => total + product.productPrice, 0)}</span>
                    </div>
                    <Button className="mt-5 mb-5" onClick={() => placeOrder(cart)} disabled={isPending}>{isPending ? "Placing Order..." : "Place Order"}</Button>
                </>
            )}
        </>
    )
}

export default ShoppingCartComponent
