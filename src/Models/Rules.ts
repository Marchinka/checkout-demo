import { IProductCheckout } from "./CheckoutItem";


export interface IRuleDto {
    type: "multiprice" | "payForNOneIsFree";
    productId: string;
    paylod?: any;
}


export interface IRule {
    productId: string;
    apply(quantity: IProductCheckout): IProductCheckout;
}

export interface IRuleSet extends Record<string, IRule> {};