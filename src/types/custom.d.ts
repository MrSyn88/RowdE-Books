declare module '*.jpg' {
    const path: string
    export default path
}

declare module '*.png' {
    const path: string
    export default path
}

declare interface Book {
    id?: string,
    auth: string,
    imageN: string,
    isbn: string,
    numP: string,
    pub: string,
    price: string,
    title: string,
    priceKey: string,
    sale: boolean
}

declare interface User {
    id: string,
    authProvider: string,
    email: string,
    name: string,
    uid: string,
    admin: boolean
}

declare interface Discount {
    id?: string,
    code: string,
    discount: number,
    expire: string
}

declare interface Order {
    id?: string,
    TotalItems: number,
    TotalPay: string,
    UserId: string,
    userName: string,
    orderDate: string
}
