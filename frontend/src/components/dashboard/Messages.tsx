import { getAllMessages } from "@/lib/messages/messages"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../ui/skeleton"
import { AdminUserContext } from "@/context/AdminUserContext"
import { useContext } from "react"

function Messages() {
    const { isError, error, data, isPending } = useQuery({
        queryKey: ["messages"],
        queryFn: getAllMessages,
        refetchInterval: 10000
    })

    const userContext = useContext(AdminUserContext)
    if (!userContext) {
        throw new Error("No User context found")
    }
    const userEmail = localStorage.getItem("email")

    if (isError) {
        return (
            <div>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <>
            {isPending ? (
                <Skeleton className="w-full h-full" />
            )
            :
            (
                <div className="flex flex-col gap-4 w-full">
                {data && data.map((data) => (
                    <div key={data.id} className={`${data.user === userEmail || data.user === userContext.userEmail ? "ml-auto" : "mr-auto"} block sm:max-w-[60%] md:max-w-[40%] p-4 rounded-lg bg-primary text-background`} title={`Sent on: ${data.sentDate}`}>
                        <span className="opacity-50">{data.user}</span>
                        <p>{data.message}</p>
                    </div>
                ))}
                </div>
            )
            }
        </>
    )
}

export default Messages
