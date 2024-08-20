import { Field, useForm } from "@tanstack/react-form"
import { z } from "zod"
import { formSchema } from "./UserLoginForm"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"
import { api } from "../api"
import AlertMessage from "@/components/dashboard/AlertMessage"

function UserRegistrationForm() {
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: ""
        },

        onSubmit: async ({ value }) => {
            setError("")
            setSuccess("")

            if (!value.email || !value.password) {
                setError("Please fill in all fields")
                return
            }

            const isValid = formSchema.safeParse(value).success

            if (!isValid) {
                setError("Email or Password is not in a valid format")
                return
            }

            const res = await api.register.$post({ json: value })

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.message)
                return
            }

            const data = await res.json()
            setSuccess(data.message)

            setTimeout(() => {
                navigate({ to: "/login" })
            }, 3000)
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
                <div className="grid grid-cols-1">
                    <form.Field
                        name="email"
                        children={(field) => (
                            <Input
                            className="my-3"
                            id={field.name}
                            name={field.name}
                            placeholder="Email"
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required={true}
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
                            placeholder="Password"
                            type="password"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required={true}
                            />
                        )}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <p className="text-center text-[.85rem] text-gray-500 mb-3">Already have an account? <Link to="/login" className="underline text-gray-400">Log in</Link></p>
                </div>
                {/* writing out error info to the user if there is an error */}
                {error && <AlertMessage message={error} Title="Error" variant="destructive" className="mb-3" />}
                {/* writing out success info to the user if registration was successful */}
                {success && <AlertMessage message={success + " Taking you to login page in 3 seconds..."} Title="Success" variant="success" className="border-green-700 text-green-700 mb-3" />}
                <div className="grid grid-cols-1">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button className="w-2/3 block mx-auto" type="submit" disabled={!canSubmit}>
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </Button>
                        )}
                    />
                </div>
            </form>
        </>
    )
}

export default UserRegistrationForm
