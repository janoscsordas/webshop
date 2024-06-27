export function parseCookies(cookieString: string) {
    const cookies: Record<string, string> = {}
    if (cookieString) {
        cookieString.split(";").forEach((cookie) => {
            const [key, value] = cookie.trim().split("=")
            cookies[decodeURIComponent(key)] = decodeURIComponent(value)
        })
    }
    return cookies
}

export function set7DaysCookie() {
    // 7 Day expire date
    const expireDate = 7 * 24 * 60 * 60
    return expireDate
}