import { MultipriceRule } from "./MultipriceRule";
import { PayForN_OneIsFreeRule } from "./PayForN_OneIsFreeRule";
import { IRuleDto, IRuleSet } from "./Rules";

export const RuleFactory = {
    create(rules: IRuleDto[]) : IRuleSet {
        let ruleSet: IRuleSet = {};

        rules.forEach(rule => {
            switch (rule.type) {
                case "multiprice":
                    ruleSet[rule.productId] = new MultipriceRule({
                        productId: rule.productId,
                        quantity: rule.payload.quantity,
                        specialPrice: rule.payload.specialPrice
                    });
                    break;
                case "payForNOneIsFree":
                    ruleSet[rule.productId] = new PayForN_OneIsFreeRule({
                        productId: rule.productId,
                        quantity: rule.payload.quantity
                    });
                    break;
                default:
                    break;
            }
        });
        return ruleSet;
    }
}