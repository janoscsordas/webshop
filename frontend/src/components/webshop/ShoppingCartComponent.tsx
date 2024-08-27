import useCart from "@/hooks/useCart";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";

const ShoppingCartComponent = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <>
            {cart.length === 0 ? (
                <h3 className="mt-16">Your shopping cart is empty.</h3>
            ) : (
                <>
                    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {cart.map((product) => (
                            <Card key={product.id}>
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
                    <div>
                        <Button onClick={() => clearCart()}>Clear Cart</Button>
                    </div>
                </>
            )}
        </>
    )
}

export default ShoppingCartComponent
