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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { MoreHorizontal } from "lucide-react"

import { removeProductHandler, RemoveSuccess, type Product } from "@/lib/products/products"
import EditProductForm from "../EditProductForm"
import { useToast } from "@/components/ui/use-toast"

interface ProductActionsProps {
    product: Product;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, products, setProducts }) => {
    const { toast } = useToast()

    // removing product handler function
    const handleProductRemove = async (id: string) => {
        const res: RemoveSuccess | string = await removeProductHandler(id)

        if (typeof res == "string") {
            throw new Error("Error removing product")
        }

        if (res.success) {
            setProducts(prevProducts => prevProducts.filter(product => product.id != id))
            toast({
                title: "Product removed",
                description: "The product no. " + id + " has been removed successfully.",
                duration: 4000
            })
        }
    }
    
    return (
        <>
            <Sheet>
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center">
                            <MoreHorizontal className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions on: {product.productName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <SheetTrigger asChild>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </SheetTrigger>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem>Remove</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to remove this product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Once it's done there's no going back.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleProductRemove(product.id)}>Remove</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Edit product: {product.productName}</SheetTitle>
                    <SheetDescription>
                        Make changes to this product here then press Save changes.
                    </SheetDescription>
                    </SheetHeader>
                    <div>
                        <EditProductForm product={product} products={products} setProducts={setProducts} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default ProductActions
