import AlertMessage from "@/components/dashboard/AlertMessage"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { api } from "../api"
import { UserContext } from "@/context/UserContext"

export const formSchema = z.object({
    email: z.string().email().max(32).min(1),
    password: z.string().min(8).max(32).min(1),
})

function UserLoginForm() {
    const [error, setError] = useState<string>("")
    const userContext = useContext(UserContext)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },

        onSubmit: async ({ value }) => {
            setError("")

            if (!value.email || !value.password) {
                setError("Please fill in all fields")
                return
            }

            const isValid = formSchema.safeParse(value).success

            if (!isValid) {
                setError("Email or Password is not in a valid format")
                return
            }

            const res = await api.login.$post({ json: value })

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.message)
                return
            }

            const data = await res.json()
            localStorage.setItem("user-email", data.email)
            userContext?.setUserEmail(data.email)

            navigate({ to: "/" })
        }
    })
    return (
        <>
            <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void form.handleSubmit()
            }}
            >
                <div className="grid grid-cols-1 mt-5">
                    <form.Field
                    name="email"
                    children={(field) => (
                        <Input
                        className="mb-3"
                        id={field.name}
                        name={field.name}
                        type="email"
                        required={true}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder="Email"
                        onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <form.Field
                        name="password"
                        children={(field) => (
                            <Input
                            className="mb-3"
                            id={field.name}
                            name={field.name}
                            type="password"
                            required={true}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            placeholder="Password"
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                    />
                </div>
                <div className="grid grid-cols-1 text-center">
                    <p className="text-gray-500 text-[.75rem] mb-3">Don't have an account? <Link className="underline text-gray-400" to="/signup">Make one</Link></p>
                </div>
                {error && <AlertMessage message={error} Title="Error" variant="destructive" className="mb-3" />}
                <div className="grid grid-cols-1">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button className="w-2/3 block mx-auto" type="submit" disabled={!canSubmit}>
                                {isSubmitting ? 'Logging in...' : 'Log in'}
                            </Button>
                        )}
                    />
                </div>
            </form>
        </>
    )
}

export default UserLoginForm
