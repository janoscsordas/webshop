import { useForm } from "@tanstack/react-form"
import { Input } from "../ui/input"
import { z } from "zod"
import { useContext, useState } from "react"
import { Button } from "../ui/button"
import { Send } from "lucide-react"
import { sendMessage } from "@/lib/messages/messages"
import AlertMessage from "./AlertMessage"
import { AdminUserContext } from "@/context/AdminUserContext"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
    message: z.string().min(1).max(100)
})

export function MessageSenderForm() {
    const [error, setError] = useState<string>()
    const queryClient = useQueryClient()

    // getting users email for sending message to database
    const userContext = useContext(AdminUserContext)
    if (!userContext) {
        throw new Error("User context not found")
    }
    const userEmail = localStorage.getItem("email")

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            message: "",
        },
        onSubmit: async ({ value }) => {
            setError("")
            if (!value.message) {
                setError("Please enter a message")
            }

            const isValid = formSchema.safeParse(value).success

            if (!isValid) {
                setError("Message is not in a valid format!")
            }

            const sendingMessage = await sendMessage(userContext.userEmail || userEmail!, value.message)

            if (typeof sendingMessage != "boolean") {
                setError(sendingMessage)
            }

            form.reset()
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
    })

    return (
        <form
        onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}
        >
            {error && (
                <div className="w-full my-2 flex justify-center items-center">
                    <AlertMessage message={error} variant="destructive" Title="Error" />
                </div>
            )}
            <div className="md:w-2/3 md:mx-auto lg:w-1/2 flex justify-between gap-5 items-center">
                <form.Field
                    name="message"
                    children={(field) => {
                        return (
                            <>
                                <Input
                                    required={true}
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter message..."
                                    maxLength={100}
                                />
                            </>
                        )
                    }}
                />
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button className="rounded-md" type="submit" disabled={!canSubmit} title="Send">
                        {isSubmitting ? <Send className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                    )}
                />
            </div>
        </form>
    )
}

export default MessageSenderForm
