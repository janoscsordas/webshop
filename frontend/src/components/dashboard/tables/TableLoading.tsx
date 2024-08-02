import { Skeleton } from "../../ui/skeleton";
import { TableCell, TableRow } from "../../ui/table";

export default function TableLoading() {
    return (
        <>
            <TableRow>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="w-full h-6 rounded-full" />
                </TableCell>
            </TableRow>
        </>
    )
}