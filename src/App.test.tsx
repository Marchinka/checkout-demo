import { CalculateCheckout } from "./Domain/CalculateCheckout";
import { ICheckout } from "./Models/CheckoutItem";
import { MultipriceRule } from "./Models/MultipriceRule";
import { PayForN_OneIsFreeRule } from "./Models/PayForN_OneIsFreeRule";
import { ICatalogue } from "./Models/Product";
import { IRule, IRuleSet, } from "./Models/Rules";

// | Item | Unit Price | Special Price |
// | ---- | ---------- | ------------- |
// | A    | 50         | 3 for 130     |
// | B    | 30         | 2 for 45      |
// | C    | 20         |
// | D    | 15         |

const A_PRODUCT = { id: "A", price: 50 };
const B_PRODUCT = { id: "B", price: 30 };
const C_PRODUCT = { id: "C", price: 20 };
const D_PRODUCT = { id: "D", price: 15 };

const CATALOGUE: ICatalogue= {
  "A": A_PRODUCT,
  "B": B_PRODUCT,
  "C": C_PRODUCT,
  "D": D_PRODUCT,
};

const A_RULE: IRule = new MultipriceRule({ productId: "A", quantity: 3, specialPrice: 130 });
const B_RULE: IRule = new MultipriceRule({ productId: "B", quantity: 2, specialPrice: 45 });

// This rule is  not part of the assignment, but I invented it to test the rule engine and if the solution is generic enough
const D_RULE: IRule = new PayForN_OneIsFreeRule({ productId: "D", quantity: 3 });

const TEST_CASES = [
  // My own test Cases
  { checkout: "A", expected: 50, rules: [] },
  { checkout: "AA", expected: 100, rules: [] },
  { checkout: "AAA", expected: 150, rules: [] },
  { checkout: "B", expected: 30, rules: [] },
  { checkout: "BB", expected: 60, rules: [] },
  { checkout: "C", expected: 20, rules: [] },
  { checkout: "D", expected: 15, rules: [] },
  { checkout: "AAA", expected: 130, rules: [A_RULE] },
  { checkout: "AAAAAAA", expected: 310, rules: [A_RULE] },
  { checkout: "DDD", expected: 30, rules: [D_RULE] },
  // Assignment Results
  { checkout: "", expected: 0, rules: [ A_RULE, B_RULE] },
  { checkout: "A", expected: 50, rules: [ A_RULE, B_RULE] },
  { checkout: "AB", expected: 80, rules: [ A_RULE, B_RULE] },
  { checkout: "CDBA", expected: 115, rules: [ A_RULE, B_RULE] },
  { checkout: "AA", expected: 100, rules: [ A_RULE, B_RULE] },
  { checkout: "AAA", expected: 130, rules: [ A_RULE, B_RULE] },
  { checkout: "AAAA", expected: 180, rules: [ A_RULE, B_RULE] },
  { checkout: "AAAAA", expected: 230, rules: [ A_RULE, B_RULE] },
  { checkout: "AAAAAA", expected: 260, rules: [ A_RULE, B_RULE] },
  { checkout: "AAAB", expected: 160, rules: [ A_RULE, B_RULE] },
  { checkout: "AAABB", expected: 175, rules: [ A_RULE, B_RULE] },
  { checkout: "AAABBD", expected: 190, rules: [ A_RULE, B_RULE] },
  { checkout: "DABABA", expected: 190, rules: [ A_RULE, B_RULE] }
];

TEST_CASES.forEach(({ checkout, expected, rules }) => {

  test(`Test Case - ${checkout} - Rules ${rules.map(r => r.productId).join(", ") || "none"}`, () => {
    // SETUP
  
    // Checkout
    const SUT = checkout;
    let checkoutList = SUT.split("");
  
    // Rules
    let ruleSet: IRuleSet = {};
    rules.forEach(rule => {
      ruleSet[rule.productId] = rule;
    });

    // Expected
    let expectedSpecialPrice = expected;
    
    // EXERCISE
    const actualResult = CalculateCheckout(checkoutList, CATALOGUE, ruleSet);
  
    // ASSERT
    expect(actualResult.totalFinalPrice).toEqual(expectedSpecialPrice);
  });

});
