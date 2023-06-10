import { ICheckout } from "../Models/CheckoutItem"
import { Catalogue, IProduct } from "../Models/Product"
import { IRuleSet } from "../Models/Rules";

export const Checkout = (checkoutList: string[], cataglogue: Catalogue, rules: IRuleSet = {}): ICheckout => {  
    let checkoutResult: ICheckout = {};
    
    checkoutList.forEach((productId: string) => {
        let product : IProduct = cataglogue[productId];
        if (!checkoutResult[productId]) {
            checkoutResult[productId] = {
                quantity: 0,
                fullPrice: 0,
                specialPrice: 0,
                productPrice: product.price
            }
        }
        checkoutResult[productId].quantity++;
        checkoutResult[productId].fullPrice += product.price;
        checkoutResult[productId].specialPrice += product.price;
    });

    Object.keys(rules).forEach((productId: string) => {
        let rule = rules[productId];
        if (checkoutResult[productId]) {
            checkoutResult[productId] = rule.apply(checkoutResult[productId]);
        }
    });

    return checkoutResult
}