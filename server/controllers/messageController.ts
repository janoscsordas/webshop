import { sendMessage, getAllMessages, type Message } from "../database/message";

import CryptoJS from "crypto-js"
import { formatDate } from "../lib/dateFormatter";

function encryptMessage(message: string) {
    const encrypted = CryptoJS.AES.encrypt(message, process.env.ENCRYPT_SECRET_KEY!).toString()
    return encrypted
}

function decryptMessage(encryptedMessage: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, process.env.ENCRYPT_SECRET_KEY!)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
}

export const getAllMessagesController = async () => {
    const messages = await getAllMessages()

    const decryptedMessages = messages.map((message) => {
        return {
            id: message.id,
            user: message.user,
            message: decryptMessage(message.message),
            sentDate: formatDate(message.sentDate),
        }
    })

    return decryptedMessages as Message[]
}

export const sendMessageController = async (email: string, message: string) => {
    const encryptedMessage = encryptMessage(message)

    const result = await sendMessage(email, encryptedMessage)
    return result
}
