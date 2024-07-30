// api and other stuff imports
import { api } from "@/lib/api"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { createProduct, type Product } from "@/lib/products/products"

// shadcn imports
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import AlertMessage from "./AlertMessage"

// zod schema for validation
const createFormSchema = z.object({
    categoryId: z.string(),
    productName: z.string().min(3).max(48),
    productPrice: z.number().min(0.01).max(99999),
    inStock: z.string()
})

// type for product types state
type ProductTypes = {
    id: string
    categoryName: string
}

interface ProductActionsProp {
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export default function CreateProduct({ setProducts }: ProductActionsProp) {
    const [productTypes, setProductTypes] = useState<ProductTypes[]>([])
    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")

    const form = useForm<z.infer<typeof createFormSchema>>({
        defaultValues: {
            categoryId: "",
            productName: "",
            productPrice: 0,
            inStock: ""
        },
        onSubmit: async ({ value }) => {
            setSuccess("")
            setError("")
            // variable for the category id
            let categoryIdFromName;

            // validating
            if (!value.categoryId || !value.productName || !value.productPrice || value.productPrice.toString()[0] == "0" || !value.inStock) {
                setError("Please fill in all fields correctly!")
                return
            }

            // zod validation
            const isValid = createFormSchema.safeParse(value)
            const validation = isValid.success

            if (!validation) {
                setError("Product's name or price is not in a valid format!")
                return
            }

            // looping through the product types to find the id we need
            for (const type of productTypes) {
                if (type.categoryName === value.categoryId) {
                    categoryIdFromName = type.id
                    break
                }
            }
            
            // setting up a typesafe object to send
            const typeSafetyValues = {
                categoryId: Number(categoryIdFromName),
                productName: value.productName,
                productPrice: value.productPrice,
                inStock: value.inStock === "Yes" ? "1" : "0"
            }

            // sending the typesafe object
            const res: Product | string = await createProduct(typeSafetyValues)

            // handling error
            if (typeof res == "string") {
                setError(res)
                return
            }

            // setting success
            setSuccess("Product Created Successfully!")
            setError("")

            const addedProduct: Product[] = [res]

            setProducts(prevProducts => [...prevProducts, addedProduct[0]])

            // resetting the form
            form.reset()
        }
    })

    useEffect(() => {
        const getProductTypes = async () => {
            const types = await api.products["product-types"].$get()
    
            if (!types.ok) {
                const errorData = await types.json()
                setError(errorData.message)
                return
            }
    
            const json = await types.json()
        
            setProductTypes(json.productTypes)
        }

        getProductTypes()
    }, [])

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-6 mb-2 items-center gap-1">
                    <form.Field
                        name="categoryId"
                        children={(field) => {
                            return (
                                <>
                                    <Label htmlFor={field.name}>Pick a Category</Label>
                                    <Select
                                        required={true}
                                        name={field.name}
                                        value={field.state.value}
                                        onValueChange={field.handleChange}
                                    >
                                        <SelectTrigger className="mt-4 sm:mt-0 w-[180px]">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Product Types</SelectLabel>
                                            {productTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.categoryName}>{type.categoryName}</SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </>
                            )
                        }}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-6 mb-2 items-center gap-1">
                    <form.Field 
                        name="productName"
                        children={(field) => {
                            return (
                                <>
                                    <Label htmlFor={field.name}>Product Name</Label>
                                    <Input 
                                        type="text"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        required={true}
                                        placeholder="Product Name"
                                        className="mt-4 sm:mt-0 w-[250px]"
                                    />
                                </>
                            )
                        }}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-6 mb-2 items-center gap-1">
                    <form.Field 
                        name="productPrice"
                        children={(field) => {
                            return (
                                <>
                                    <Label htmlFor={field.name}>Product Price ($)</Label>
                                    <Input
                                        type="number"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        onBlur={field.handleBlur}
                                        required={true}
                                        placeholder="Product Price"
                                        className="mt-4 sm:mt-0 w-[250px]"
                                    />
                                </>
                            )
                        }}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 mt-6 mb-2 items-center gap-1">
                    <form.Field 
                        name="inStock"
                        children={(field) => {
                            return (
                                <>
                                    <Label htmlFor={field.name}>Is it in stock?</Label>
                                    <Select
                                        required={true}
                                        name={field.name}
                                        value={field.state.value}
                                        onValueChange={field.handleChange}
                                    >
                                        <SelectTrigger className="mt-4 sm:mt-0 w-[180px]">
                                            <SelectValue placeholder="Is it in stock?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Is it in stock?</SelectLabel>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                            <SelectItem value="No">No</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </>
                            )
                        }}
                    />
                </div>
                {error && <AlertMessage variant="destructive" message={error} Title="Error" />}
                {success && <AlertMessage variant="success" className="border-green-700 text-green-700" message={success} Title="Success" /> }
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button className="w-fit sm:w-2/5 block mt-6" type="submit" disabled={!canSubmit}>
                        {isSubmitting ? 'Adding new Product..' : 'Add new Product'}
                        </Button>
                    )}
                />
            </form>
        </>
    )
}