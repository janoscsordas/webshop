import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { useNavigate } from "@tanstack/react-router"

import { useForm } from "@tanstack/react-form"
import { api } from "@/lib/api"

import { useContext, useState } from "react"
import { AdminUserContext } from "@/context/AdminUserContext"

const LoginAlertError = (props: any) => {
    return (
        <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-[.8rem]">{props.message}</AlertDescription>
        </Alert>
    )
}

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password is not long enough" }).max(24, { message: "Password is too long" }),
})

export function AdminLoginForm() {
    const [error, setError] = useState<any>('')
    const userContext = useContext(AdminUserContext)
    
    const navigate = useNavigate()
    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: '',
            password: '',
        },
        // Define a submit handler
        onSubmit: async ({ value }) => {
            if (!value.email || !value.password) {
                setError("Please fill in all fields")
                return
            }

            const isValid = formSchema.safeParse(value).success

            if (!isValid) {
                setError("Email or Password is not in a valid format")
                return
            }

            // Posting login data to server
            const res = await api.admin["login"].$post({ json: value })

            // if error, set error state
            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData.message)
                return
            }

            const data = await res.json()
            localStorage.setItem("email", data.email)
            userContext!.setUserEmail(data.email)

            setError('')
            // if success, navigate to dashboard
            navigate({ to: "/admin/dashboard" })
        }
    })


    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    void form.handleSubmit()
                }}>
                    <form.Field
                        name="email"
                        children={(field) => (
                            <>
                                <Input
                                className="mb-3"
                                placeholder="Email"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                type="email"
                                onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </>
                        )}
                    />
                    <form.Field 
                        name="password"
                        children={(field) => (
                            <>
                                <Input
                                className="mb-3"
                                placeholder="Password"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="password"
                                />
                            </>
                        )}
                    />
                    {error && <LoginAlertError message={error} />}
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button className="w-2/3 block mx-auto" type="submit" disabled={!canSubmit}>
                            {isSubmitting ? 'Logging in...' : 'Log in'}
                            </Button>
                        )}
                    />
            </form>
        </>
    )
}