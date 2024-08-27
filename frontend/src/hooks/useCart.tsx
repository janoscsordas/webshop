import { useToast } from "@/components/ui/use-toast"
import { Product } from "@/lib/products/products"
import { useState, useEffect } from "react"


const useCart = () => {
    const { toast } = useToast()

    // getting the cart from local storage if there is any, otherwise comes back with an empty array
    const [cart, setCart] = useState<Product[]>(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    // function for adding a product to the cart
    const addToCart = (product: Product) => {
        const updatedCart = [...cart, product]
        setCart(updatedCart)
        toast({
            title: "Added To Cart",
            description: "Product " + product.productName + " has been added to cart successfully!"
        })
    }

    // function for clearing the cart
    const clearCart = () => {
        setCart([])
        localStorage.removeItem('cart')
    }

    // function for removing one item from the cart
    const removeFromCart = (productId: string) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== productId);
            return updatedCart
        })
        toast({
            title: "Item removed from cart!",
            description: "Item No. " + productId + " has been removed successfully!"
        })
    }

    // watches changes in the cart state and updates local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return { cart, addToCart, clearCart, removeFromCart }
}

export default useCart
