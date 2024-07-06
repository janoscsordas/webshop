import { z } from "zod"
import { updateProduct, type Product } from "@/lib/products/products"

import { useForm } from "@tanstack/react-form"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

import { SheetClose, SheetFooter } from "../ui/sheet"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { useState } from "react"
import { SelectValue } from "@radix-ui/react-select"
import AlertMessage from "./AlertMessage"

interface ProductActionsProps {
    product: Product;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
const formSchema = z.object({
    productName: z.string().min(3).max(48),
    productPrice: z.number().min(0.01).max(99999),
    inStock: z.string()
})

const EditProductForm: React.FC<ProductActionsProps> = ({ product, setProducts }) => {
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            productName: product.productName,
            productPrice: product.productPrice,
            inStock: product.inStock
        },
        // Define a submit handler
        onSubmit: async ({ value }) => {
            setSuccess(false)

            if (!value.productName || !value.productPrice || !value.inStock) {
                setError("Please fill in all fields")
                return
            }

            const isValid = formSchema.safeParse(value).success

            if (!isValid) {
                setError("Product's name or price is not in a valid format!")
                return
            }

            const typeSafetyValues = {
                id: product.id,
                productName: value.productName,
                productPrice: value.productPrice,
                inStock: value.inStock === "Yes" ? "1" : "0"
            }

            const res = await updateProduct(typeSafetyValues)

            if (res.error) {
                setError(res.error)
                return
            }

            setSuccess(true)
            setProducts(prevProducts => prevProducts.map(p => p.id === product.id ? { ...p, ...value } : p))
            setError('')
        },
    })

    return (
        <>
            <form
                className="grid gap-4 py-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}>
                <div className="grid grid-cols-4 items-center gap-4">
                    <form.Field
                     name="productName"
                     children={(field) => {
                        return (
                            <>
                                <Label htmlFor={field.name} className="text-right">
                                Name
                                </Label>
                                <Input 
                                required={true}
                                type="text"
                                id={field.name} 
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="col-span-3" />
                            </>
                        )
                     }}
                     />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <form.Field 
                    name="productPrice"
                    children={(field) => {
                        return (
                            <>
                                <Label htmlFor={field.name} className="text-right">
                                Price ($)
                                </Label>
                                <Input
                                required={true}
                                type="number" 
                                id={field.name} 
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="col-span-3" />
                            </>
                        )
                    }}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <form.Field
                    name="inStock"
                    children={(field) => {
                        return (
                            <>
                                <Label htmlFor={field.name} className="text-right">
                                In Stock
                                </Label>
                                <Select  
                                required={true}
                                name={field.name}
                                value={field.state.value}
                                onValueChange={field.handleChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Is it in stock?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Yes">Yes</SelectItem>
                                        <SelectItem value="No">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </>
                        )
                    }} />
                </div>
                {error && <AlertMessage variant="destructive" message={error} Title="Error" />}
                {success && <AlertMessage variant="success" className="border-green-700 text-green-700" message="Product updated successfully!" Title="Success" /> }
                <SheetFooter>
                    <SheetClose asChild>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <Button className="w-2/3 block mx-auto" type="submit" disabled={!canSubmit}>
                                {isSubmitting ? 'Saving changes..' : 'Save Changes'}
                                </Button>
                            )}
                        />
                    </SheetClose>
                </SheetFooter> 
            </form>
        </>
    )
}

export default EditProductForm