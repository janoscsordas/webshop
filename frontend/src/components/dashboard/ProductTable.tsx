import AlertMessage from "./AlertMessage"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"

import TableLoading from "./TableLoading"

import useProducts from "@/hooks/useProducts"
import ProductActions from "./ProductActions"

// function for getting all products with Hono RPC


const ProductTable: React.FC = () => {
    const { isPending, isError, error, products, setProducts, sortedProducts, searchTerm, setSearchTerm, requestSort } = useProducts();

    if (isError) {
      return <AlertMessage Error="Error" message={error?.message} />;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Search for a product</CardTitle>
                    <CardDescription>Type in the product's name to filter the list</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input type="text" className="sm:w-1/2 md:w-2/5 lg:w-2/6" name="search" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
                </CardContent>
            </Card>
            <Table className="border rounded-lg bg-background max-h-[75dvh] no-scrollbar">
                <TableHeader>
                    <tr>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("categoryName")} >Category</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("productName")} >Product</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("productPrice")} >Price</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("createdAt")} >Created At</TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground select-none" onClick={() => requestSort("inStock")} >In Stock</TableHead>
                    <TableHead>Actions</TableHead>
                    </tr>
                </TableHeader>
                <TableBody>
                    {isPending ? (
                        <TableLoading />
                    ): (
                        sortedProducts.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.categoryName}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>$ {product.productPrice}</TableCell>
                                <TableCell>{product.createdAt}</TableCell>
                                <TableCell>{product.inStock}</TableCell>
                                <TableCell>
                                    <ProductActions product={product} products={products} setProducts={setProducts} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default ProductTable