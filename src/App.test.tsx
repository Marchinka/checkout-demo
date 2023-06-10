import { Checkout } from "./Domain/Checkout";
import { ICheckout } from "./Models/CheckoutItem";
import { Catalogue } from "./Models/Product";
import { IRule, IRuleSet, MultipriceRule } from "./Models/Rules";

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

const CATALOGUE: Catalogue= {
  "A": A_PRODUCT,
  "B": B_PRODUCT,
  "C": C_PRODUCT,
  "D": D_PRODUCT,
};

const A_RULE: IRule = new MultipriceRule({ productId: "A", quantity: 3, specialPrice: 130 });
const B_RULE: IRule = new MultipriceRule({ productId: "B", quantity: 2, specialPrice: 45 });

test('0 items', () => {
  // SETUP
  
  // Checkout
  let checkoutList: string[] = [];

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(Object.keys(actualResult).length).toEqual(0);
});

test('A x 1', () => {
  // SETUP
  
  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = A_PRODUCT.price * checkoutList.length;

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('A x 2', () => {
  // SETUP
  
  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT, SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = A_PRODUCT.price * checkoutList.length;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('A x 3 no rule', () => {
  // SETUP
  
  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT, SUT, SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = A_PRODUCT.price * checkoutList.length;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('B x 1', () => {
  // SETUP
  
  // Checkout
  const SUT = "B";
  let checkoutList = [ SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = B_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = B_PRODUCT.price * checkoutList.length;

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('B x 2 no rule', () => {
  // SETUP
  
  // Checkout
  const SUT = "B";
  let checkoutList = [ SUT, SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = B_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = B_PRODUCT.price * checkoutList.length;

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('C x 1', () => {
  // SETUP
  
  // Checkout
  const SUT = "C";
  let checkoutList = [ SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = C_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = C_PRODUCT.price * checkoutList.length;

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('D x 1', () => {
  // SETUP
  
  // Checkout
  const SUT = "D";
  let checkoutList = [ SUT ];

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = D_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = D_PRODUCT.price * checkoutList.length;

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('A x 2 with rule', () => {
  // SETUP

  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT, SUT ];

  // Rules
  let ruleSet: IRuleSet = {};
  ruleSet[SUT] = A_RULE;

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = A_PRODUCT.price * checkoutList.length;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE, ruleSet);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('A x 3 with rule', () => {
  // SETUP

  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT, SUT, SUT ];

  // Rules
  let ruleSet: IRuleSet = {};
  ruleSet[SUT] = A_RULE;

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = 130;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE, ruleSet);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('A x 6 with rule', () => {
  // SETUP

  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT, SUT, SUT, SUT, SUT, SUT ];

  // Rules
  let ruleSet: IRuleSet = {};
  ruleSet[SUT] = A_RULE;

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = 260;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE, ruleSet);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('A x 7 with rule', () => {
  // SETUP

  // Checkout
  const SUT = "A";
  let checkoutList = [ SUT, SUT, SUT, SUT, SUT, SUT, SUT ];

  // Rules
  let ruleSet: IRuleSet = {};
  ruleSet[SUT] = A_RULE;

  // Expected
  let expectedQuantity = checkoutList.length;
  let expectedFullPrice = A_PRODUCT.price * checkoutList.length;
  let expectedSpecialPrice = 260 +  A_PRODUCT.price;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE, ruleSet);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedQuantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedFullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedSpecialPrice);
});

test('Assignment test Case - A', () => {
  // SETUP

  // Checkout
  const SUT = "A";
  let checkoutList = SUT.split("");

  // Rules
  let ruleSet: IRuleSet = {
    "A": A_RULE,
    "B": B_RULE
  };

  // Expected
  let expectedSpecialPrice = 50;
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE, ruleSet);

  // ASSERT
  const totalPrice = Object.keys(actualResult).reduce((acc, key) => {
    return acc + actualResult[key].specialPrice;
  }, 0);
  expect(totalPrice).toEqual(expectedSpecialPrice);
});


const ASSIGNEMENT_RESULTS = [
  { checkout: "", expected: 0 },
  { checkout: "A", expected: 50 },
  { checkout: "AB", expected: 80 },
  { checkout: "CDBA", expected: 115 },
  { checkout: "AA", expected: 100 },
  { checkout: "AAA", expected: 130 },
  { checkout: "AAAA", expected: 180 },
  { checkout: "AAAAA", expected: 230 },
  { checkout: "AAAAAA", expected: 260 },
  { checkout: "AAAB", expected: 160 },
  { checkout: "AAABB", expected: 175 },
  { checkout: "AAABBD", expected: 190 },
  { checkout: "DABABA", expected: 190 }
];

ASSIGNEMENT_RESULTS.forEach(({ checkout, expected }) => {

  test(`Assignment test Case - ${checkout}`, () => {
    // SETUP
  
    // Checkout
    const SUT = checkout;
    let checkoutList = SUT.split("");
  
    // Rules
    let ruleSet: IRuleSet = {
      "A": A_RULE,
      "B": B_RULE
    };
  
    // Expected
    let expectedSpecialPrice = expected;
    
    // EXERCISE
    const actualResult = Checkout(checkoutList, CATALOGUE, ruleSet);
  
    // ASSERT
    const totalPrice = Object.keys(actualResult).reduce((acc, key) => {
      return acc + actualResult[key].specialPrice;
    }, 0);
    expect(totalPrice).toEqual(expectedSpecialPrice);
  });

});
