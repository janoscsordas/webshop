import { getAllMessages } from "@/lib/messages/messages"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "../ui/skeleton"
import { AdminUserContext } from "@/context/AdminUserContext"
import { useContext, useEffect } from "react"

function Messages() {
    const { isError, error, data, isPending } = useQuery({
        queryKey: ["messages"],
        queryFn: getAllMessages,
        refetchInterval: 7500
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

    useEffect(() => {
        if (data) {
            const messageDiv = document.getElementById("message-div")
            const lastChild = messageDiv!.lastElementChild;
            if (lastChild) {
                lastChild.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [data])

    return (
        <>
            {isPending ? (
                <Skeleton className="w-full min-h-[85dvh]" />
            )
            :
            (
                <div id="message-div" className="flex flex-col gap-4 w-full">
                {data.length > 0 ? data.map((data) => (
                    <div key={data.id} className={`${data.user === userEmail || data.user === userContext.userEmail ? "ml-auto" : "mr-auto"} block sm:max-w-[60%] md:max-w-[40%] p-4 rounded-lg bg-primary text-background`} title={`Sent on: ${data.sentDate}`}>
                        <span className="opacity-50 select-none">{data.user}</span>
                        <p>{data.message}</p>
                    </div>
                )) : (
                    <h1 className="text-center">No messages yet... Send a message to get started.</h1>
                )}
                </div>
            )
            }
        </>
    )
}

export default Messages
