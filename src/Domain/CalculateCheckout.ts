import { ICheckout, TotalCheckout } from "../Models/CheckoutItem"
import { ICatalogue } from "../Models/Product"
import { IRuleSet } from "../Models/Rules";

export const CalculateCheckout = (checkoutList: string[], cataglogue: ICatalogue, rules: IRuleSet = {}): TotalCheckout => {  
    let checkoutResult: ICheckout = {};
    let result : Record<string, number> = countProductIds(checkoutList);

    calculateFullPrice(result, checkoutResult, cataglogue);

    calculateDiscounts(rules, checkoutResult);

    let totalFullPrice = 0;
    let totalFinalPrice = 0;
    Object.keys(checkoutResult).forEach((key) => {
        totalFinalPrice += checkoutResult[key].finalPrice;
        totalFullPrice += checkoutResult[key].fullPrice;
    });

    return {
        checkout: checkoutResult,
        totalFinalPrice: totalFinalPrice || 0, 
        totalFullPrice: totalFullPrice || 0
    }
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

const calculateFullPrice = (result: Record<string, number>, checkoutResult: ICheckout, catalogue: ICatalogue) => {
    Object.keys(result).forEach((productId: string) => {
        if (!catalogue[productId]) return;
        
        checkoutResult[productId] = {
            quantity: result[productId],
            productPrice: catalogue[productId]?.price,
            fullPrice: result[productId] * catalogue[productId]?.price || 0,
            finalPrice: result[productId] * catalogue[productId]?.price || 0
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

