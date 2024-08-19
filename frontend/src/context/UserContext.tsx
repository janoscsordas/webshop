import { createContext, useState, ReactNode, useEffect } from 'react'

interface UserContextType {
    userEmail: string;
    setUserEmail: (email: string) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userEmail, setUserEmail] = useState<string>('')

    useEffect(() => {
        const email = localStorage.getItem("email")

        if (email) {
            setUserEmail(email)
        }
    }, [])

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    )
}
