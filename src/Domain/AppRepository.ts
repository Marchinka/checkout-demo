import { ICheckout } from "../Models/CheckoutItem";
import { Catalogue, IProduct } from "../Models/Product";
import { IRule, IRuleSet, MultipriceRule } from "../Models/Rules";

const A_PRODUCT = { id: "A", price: 50 };
const B_PRODUCT = { id: "B", price: 30 };
const C_PRODUCT = { id: "C", price: 20 };
const D_PRODUCT = { id: "D", price: 15 };

const CATALOGUE: Catalogue= {
  "A": A_PRODUCT,
  "B": B_PRODUCT,
  "C": C_PRODUCT,
  "D": D_PRODUCT,
};

const A_RULE: IRule = new MultipriceRule({ productId: "A", quantity: 3, specialPrice: 130 });
const B_RULE: IRule = new MultipriceRule({ productId: "B", quantity: 2, specialPrice: 45 });

export const AppRepository = {
    
    getCheckoutList: async (): Promise<string[]> => {
        console.log("Fetch checkout list");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(["A", "D"]);
            }, 1000);
        });
    },
    getCatalogue: async (): Promise<Catalogue> => {
        console.log("Fetch catalogue from server");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(CATALOGUE);
            }, 1000);
        });
    },
    getRules: async (): Promise<IRuleSet> => {
        console.log("Fetch rules from server");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    "A": A_RULE,
                    "B": B_RULE,
                });
            }, 1000);
        });
    }
};