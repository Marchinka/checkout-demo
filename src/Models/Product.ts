export  interface IProduct {
    id: string;
    price: number;
}

export interface ICatalogue extends Record<string, IProduct> {
}