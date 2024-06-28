import { api } from "@/lib/api"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

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
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { createProduct } from "@/lib/products/products"
import AlertMessage from "./AlertMessage"

const createFormSchema = z.object({
    categoryId: z.string(),
    productName: z.string().min(3, { message: "Name is too short" }).max(48, { message: "Name is too long" }),
    productPrice: z.number({ invalid_type_error: "Price must be a number" }).min(0.01, { message: "Price must be greater than 0" }).max(99999, { message: "Price is too high" }),
    inStock: z.string()
})

type ProductTypes = {
    id: string
    categoryName: string
}

export default function CreateProduct() {
    const [productTypes, setProductTypes] = useState<ProductTypes[]>([])
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const form = useForm<z.infer<typeof createFormSchema>>({
        defaultValues: {
            categoryId: "",
            productName: "",
            productPrice: 0,
            inStock: ""
        },
        onSubmit: async ({ value }) => {
            setIsSuccess(false)
            let categoryIdFromName;

            if (!value.categoryId || !value.productName || !value.productPrice || !value.inStock) {
                setError("Please fill in all fields")
                return
            }

            const isValid = createFormSchema.safeParse(value)
            const validation = isValid.success
            const error = isValid.error?.errors

            if (!validation) {
                setError(error![0].message)
                return
            }

            for (const type of productTypes) {
                if (type.categoryName === value.categoryId) {
                    categoryIdFromName = type.id
                }
            }
            
            const typeSafetyValues = {
                categoryId: Number(categoryIdFromName),
                productName: value.productName,
                productPrice: value.productPrice,
                inStock: value.inStock === "Yes" ? "1" : "0"
            }

            const res = await createProduct(typeSafetyValues)

            if (!res) {
                setError("Error creating product")
            }

            setIsSuccess(true)
            setError("")
        }
    })

    useEffect(() => {
        const getProductTypes = async () => {
            const types = await api.products["product-types"].$get()
    
            if (!types.ok) {
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
                <div className="grid gap-1 grid-cols-3 mt-6 items-center">
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
                                        <SelectTrigger className="w-[180px]">
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
                <div className="grid grid-cols-3 mt-6 items-center gap-1">
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
                                        className="w-[250px]"
                                    />
                                </>
                            )
                        }}
                    />
                </div>
                <div className="grid grid-cols-3 mt-6 items-center gap-1">
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
                                        className="w-[250px]"
                                    />
                                </>
                            )
                        }}
                    />
                </div>
                <div className="grid grid-cols-3 mt-6 mb-2 items-center gap-1">
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
                                        <SelectTrigger className="w-[180px]">
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
                {isSuccess && <AlertMessage variant="success" className="border-green-700 text-green-700" message="Product created successfully!" Title="Success" /> }
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button className="w-2/5 block mt-6" type="submit" disabled={!canSubmit}>
                        {isSubmitting ? 'Adding new Product..' : 'Add new Product'}
                        </Button>
                    )}
                />
            </form>
        </>
    )
}