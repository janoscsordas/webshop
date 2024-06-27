import { createContext, useState, ReactNode, useEffect } from 'react'

interface AdminUserContextType {
    userEmail: string;
    setUserEmail: (email: string) => void
}

export const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined)

interface AdminUserProviderProps {
    children: ReactNode
}

export const AdminUserProvider = ({ children }: AdminUserProviderProps) => {
    const [userEmail, setUserEmail] = useState<string>('')

    useEffect(() => {
        const email = localStorage.getItem("email")

        if (email) {
            setUserEmail(email)
        }
    }, [])

    return (
        <AdminUserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </AdminUserContext.Provider>
    )
}