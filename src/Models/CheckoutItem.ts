export interface IQuantity {
    quantity: number;
    fullPrice: number;
    specialPrice: number;
}

export interface ICheckout extends Record<string, IQuantity> {
}