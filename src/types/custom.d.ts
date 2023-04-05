declare module '*.jpg' {
    const path: string
    export default path
}

declare module '*.png' {
    const path: string
    export default path
}

declare interface Book {
    id: string,
    auth: string,
    imageN: string,
    isbn: string,
    numP: string,
    pub: string,
    title: string
}

declare interface User {
    id: string,
    authProvider: string,
    email: string,
    name: string,
    uid: string,
    admin?: boolean
}
