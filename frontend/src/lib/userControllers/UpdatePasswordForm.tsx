import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { useContext, useState } from "react"
import { z } from "zod"
import { api } from "../api"
import { UserContext } from "@/context/UserContext"
import AlertMessage from "@/components/dashboard/AlertMessage"

const updatePasswordSchema = z.object({
    password: z.string().min(8).max(32).min(1),
    repeatedPassword: z.string().min(8).max(32).min(1)
})

function UpdatePasswordForm() {
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")

    const userContext = useContext(UserContext)

    const form = useForm<z.infer<typeof updatePasswordSchema>>({
        defaultValues: {
            password: "",
            repeatedPassword: ""
        },

        onSubmit: async ({ value }) => {
            setError("")
            setSuccess("")

            if (!value.password || !value.repeatedPassword) {
                setError("Please fill in all fields")
                return
            }

            const isValid = updatePasswordSchema.safeParse(value).success

            if (!isValid) {
                setError("Password is not in a valid format")
                return
            }

            if (value.password !== value.repeatedPassword) {
                setError("Passwords do not match")
                return
            }

            const userEmail = userContext?.userEmail || localStorage.getItem("user-email")
            const newPassword = value.password
            const userDetails = {
                email: userEmail,
                newPassword: newPassword
            }

            const res = await api["update-password"].$post({ json: userDetails })

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.message)
                return
            }

            const data = await res.json()
            setSuccess(data.message)
            form.reset()

            setTimeout(() => {
                setSuccess("")
            }, 8000)
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
                        placeholder="New Password"
                        onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                    />
                </div>
                <div className="grid grid-cols-1 mt-1">
                    <form.Field
                    name="repeatedPassword"
                    children={(field) => (
                        <Input
                        className="mb-3"
                        id={field.name}
                        name={field.name}
                        type="password"
                        required={true}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        placeholder="Repeat New Password"
                        onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                    />
                </div>
                {/* showing error if something went wrong */}
                {error && <AlertMessage Title="Error" message={error} variant="destructive" className="my-3" />}
                {/* showing success message if password update was successful */}
                {success && <AlertMessage Title="Success" message={success} variant="success" className="border-green-700 text-green-700 my-3" />}
                <div className="grid grid-cols-1">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button className="w-1/2 md:w-2/3 block" type="submit" disabled={!canSubmit}>
                                {isSubmitting ? 'Updating Password...' : 'Update Password'}
                            </Button>
                        )}
                    />
                </div>
            </form>
        </>
    )
}

export default UpdatePasswordForm
