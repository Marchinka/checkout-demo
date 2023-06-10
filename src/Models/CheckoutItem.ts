export interface IProductCheckout {
    quantity: number;
    productPrice: number;
    fullPrice: number;
    specialPrice: number;
}

export interface ICheckout extends Record<string, IProductCheckout> {
}