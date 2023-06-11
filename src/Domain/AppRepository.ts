import { ICheckout } from "../Models/CheckoutItem";
import { MultipriceRule } from "../Models/MultipriceRule";
import { ICatalogue, IProduct } from "../Models/Product";
import { IRule, IRuleDto, IRuleSet } from "../Models/Rules";

const A_PRODUCT = { id: "A", price: 50, img: "https://source.unsplash.com/P2X7NDx_GP0" };
const B_PRODUCT = { id: "B", price: 30, img: "https://source.unsplash.com/ezSFnAFi9hY" };
const C_PRODUCT = { id: "C", price: 20, img: "https://source.unsplash.com/VI2rIoZUrks" };
const D_PRODUCT = { id: "D", price: 15, img: "https://source.unsplash.com/hUkZv0Y47Ic" };

const CATALOGUE: ICatalogue= {
  "A": A_PRODUCT,
  "B": B_PRODUCT,
  "C": C_PRODUCT,
  "D": D_PRODUCT,
};

const RULES : IRuleDto[] = [
    { type: "multiprice", productId: "A", payload: { quantity: 3, specialPrice: 130 } },
    { type: "multiprice", productId: "B", payload: { quantity: 2, specialPrice: 45 } }
];

export const AppRepository = {
    
    getCheckoutList: async (): Promise<string[]> => {
        console.log("Fetch checkout list");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(["A", "D"]);
            }, 1000);
        });
    },
    getCatalogue: async (): Promise<ICatalogue> => {
        console.log("Fetch catalogue from server");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(CATALOGUE);
            }, 1000);
        });
    },
    getRules: async (): Promise<IRuleDto[]> => {
        console.log("Fetch rules from server");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(RULES);
            }, 1000);
        });
    }
};