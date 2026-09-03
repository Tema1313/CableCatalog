export interface IAuth {
    login: string | null
    isLoggedIn: boolean
    setLogin: (userName: string) => void
    resetLogin: () => void
    // какие-то более поелезные данные для аутентификации - токены и тд
}

