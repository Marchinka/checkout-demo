export  interface IProduct {
    id: string;
    price: number;
}

export interface Catalogue extends Record<string, IProduct> {
}