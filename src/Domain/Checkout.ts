import { ICheckout } from "../Models/CheckoutItem"
import { Catalogue, IProduct } from "../Models/Product"

export const Checkout = (checkoutList: string[], cataglogue: Catalogue, rules: any[] = []): ICheckout => {  
    let checkoutResult: ICheckout = {};
    
    checkoutList.forEach((productId: string) => {
        let product : IProduct = cataglogue[productId];
        if (!checkoutResult[productId]) {
            checkoutResult[productId] = {
                quantity: 0,
                fullPrice: 0,
                specialPrice: 0
            }
        }
        checkoutResult[productId].quantity++;
        checkoutResult[productId].fullPrice += product.price;
        checkoutResult[productId].specialPrice += product.price;
    });

    return checkoutResult
}