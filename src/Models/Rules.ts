import { IProductCheckout } from "./CheckoutItem";

export interface IRule {
    productId: string;
    apply(quantity: IProductCheckout): IProductCheckout;
}

export interface IRuleSet extends Record<string, IRule> {};

export class MultipriceRule implements IRule {
    readonly productId: string;
    readonly discountQuantity: number;
    readonly specialPrice: number;

    constructor({ productId, quantity, specialPrice }: { productId: string; quantity: number; specialPrice: number; }) {    
        this.productId = productId;
        this.discountQuantity = quantity;
        this.specialPrice = specialPrice;
    }
    
    apply(productCheckout: IProductCheckout): IProductCheckout {
        const numberOfDiscounts = Math.trunc(productCheckout.quantity / this.discountQuantity);
        const numberOfFullpricedElements =productCheckout.quantity % this.discountQuantity;

        return {
            ...productCheckout,
            specialPrice: numberOfDiscounts * this.specialPrice + numberOfFullpricedElements * productCheckout.productPrice
        }
        
    }
}