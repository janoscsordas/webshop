import { api } from "../api";

export type Message = {
    id: number
    user: string
    message: string
    sentDate: string
}

export async function getAllMessages() {
    const response = await api.message.$get()

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
    }

    const data = await response.json()

    return data.messages
}

export async function sendMessage(email: string, message: string) {
    try {
        const response = await api.message["send"].$post({
            json: { email, message }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const data = await response.json()

        return data.success
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}
