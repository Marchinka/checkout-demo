import { ICheckout } from "../Models/CheckoutItem"
import { ICatalogue, IProduct } from "../Models/Product"
import { IRuleSet } from "../Models/Rules";

export const Checkout = (checkoutList: string[], cataglogue: ICatalogue, rules: IRuleSet = {}): ICheckout => {  
    let checkoutResult: ICheckout = {};
    let result : Record<string, number> = countProductIds(checkoutList);
    calculateFullPrice(result, checkoutResult, cataglogue);
    calculateDiscounts(rules, checkoutResult);
    return checkoutResult
}

const countProductIds = (productIds: string[]): Record<string, number>  => {
    const count: Record<string, number> = {};
  
    for (const productId of productIds) {
      if (count[productId]) {
        count[productId]++;
      } else {
        count[productId] = 1;
      }
    }
  
    return count;
};

const calculateFullPrice = (result: Record<string, number>, checkoutResult: ICheckout, cataglogue: ICatalogue) => {
    Object.keys(result).forEach((productId: string) => {
        checkoutResult[productId] = {
            quantity: result[productId],
            productPrice: cataglogue[productId].price,
            fullPrice: result[productId] * cataglogue[productId].price,
            finalPrice: result[productId] * cataglogue[productId].price
        };
    });
};

const calculateDiscounts = (rules: IRuleSet, checkoutResult: ICheckout) => {
    Object.keys(rules).forEach((productId: string) => {
        let rule = rules[productId];
        if (checkoutResult[productId]) {
            checkoutResult[productId] = rule.apply(checkoutResult[productId]);
        }
    });
};

