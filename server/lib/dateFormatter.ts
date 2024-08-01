export function formatDate(date: string) {
    const newDate = new Date(date)

    const year = newDate.getFullYear()
    const month = String(newDate.getMonth() + 1).padStart(2, '0') // Hónap 0-tól 11-ig, ezért +1 és padding nullával
    const day = String(newDate.getDate()).padStart(2, '0') // Padding nullával

    return `${year}-${month}-${day}`
}