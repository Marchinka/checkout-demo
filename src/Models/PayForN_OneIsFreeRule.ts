import { IProductCheckout } from "./CheckoutItem";

export interface PayForN_OneIsFreeRuleDto {
    productId: string;
    quantity: number;
};

export class PayForN_OneIsFreeRule {
    readonly productId: string;
    readonly discountQuantity: number;

    constructor({ productId, quantity }: PayForN_OneIsFreeRuleDto) {    
        this.productId = productId;
        this.discountQuantity = quantity;
    }
    
    apply(productCheckout: IProductCheckout): IProductCheckout {
        if (productCheckout.quantity < this.discountQuantity) return productCheckout;

        const numberOfDiscounts = Math.trunc(productCheckout.quantity / this.discountQuantity);

        return {
            ...productCheckout,
            finalPrice: productCheckout.fullPrice - productCheckout.productPrice * numberOfDiscounts
        }
    }
}