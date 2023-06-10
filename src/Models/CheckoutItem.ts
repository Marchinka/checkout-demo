export interface IProductCheckout {
    quantity: number;
    productPrice: number;
    fullPrice: number;
    finalPrice: number;
}

export interface ICheckout extends Record<string, IProductCheckout> {
}