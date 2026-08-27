export interface IAuth {
    userName: string | null
    isLoggedIn: boolean
    login: (userName: string) => void
    logout: () => void
    // какие-то более поелезные данные для аутентификации - токены и тд
}

