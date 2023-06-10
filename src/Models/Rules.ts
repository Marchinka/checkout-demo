import { IProductCheckout } from "./CheckoutItem";

export interface IRule {
    productId: string;
    apply(quantity: IProductCheckout): IProductCheckout;
}

export interface IRuleSet extends Record<string, IRule> {};

type MultipriceRuleDto = {
    productId: string;
    quantity: number;
    specialPrice: number;
};

export class MultipriceRule implements IRule {
    readonly productId: string;
    readonly discountQuantity: number;
    readonly specialPrice: number;

    constructor({ productId, quantity, specialPrice }: MultipriceRuleDto) {    
        this.productId = productId;
        this.discountQuantity = quantity;
        this.specialPrice = specialPrice;
    }
    
    apply(productCheckout: IProductCheckout): IProductCheckout {
        if (productCheckout.quantity < this.discountQuantity) return productCheckout;

        const numberOfDiscounts = Math.trunc(productCheckout.quantity / this.discountQuantity);
        const numberOfFullpricedElements =productCheckout.quantity % this.discountQuantity;

        const discountedPrice = numberOfDiscounts * this.specialPrice;
        const regularPrice = numberOfFullpricedElements * productCheckout.productPrice;
        
        return {
            ...productCheckout,
            specialPrice: discountedPrice + regularPrice
        }
    }
}