import { IProductCheckout } from "./CheckoutItem";
import { IRule } from "./Rules";

export interface IMultipriceRuleDto {
    productId: string;
    quantity: number;
    specialPrice: number;
};

export class MultipriceRule implements IRule {
    readonly productId: string;
    readonly discountQuantity: number;
    readonly specialPrice: number;

    constructor({ productId, quantity, specialPrice }: IMultipriceRuleDto) {    
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
            finalPrice: discountedPrice + regularPrice
        }
    }
}