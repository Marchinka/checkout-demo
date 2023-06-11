export  interface IProduct {
    id: string;
    price: number;
    img?: string;
}

export interface ICatalogue extends Record<string, IProduct> {
}