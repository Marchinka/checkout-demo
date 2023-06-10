import { Checkout } from "./Domain/Checkout";
import { ICheckout } from "./Models/CheckoutItem";
import { Catalogue } from "./Models/Product";

// | Item | Unit Price | Special Price |
// | ---- | ---------- | ------------- |
// | A    | 50         | 3 for 130     |
// | B    | 30         | 2 for 45      |
// | C    | 20         |
// | D    | 15         |


const CATALOGUE: Catalogue= {
  "A": { id: "A", price: 50 },
  "B": { id: "B", price: 30 },
  "C": { id: "C", price: 20 },
  "D": { id: "D", price: 15 },
};

test('0 items', () => {
  // SETUP
  let checkoutList: string[] = [];

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(Object.keys(actualResult).length).toEqual(0);
});

test('A x 1', () => {
  // SETUP
  const SUT = "A";
  let checkoutList = [ SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 1, fullPrice: 50, specialPrice: 50 };

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});

test('A x 2', () => {
  // SETUP
  const SUT = "A";
  let checkoutList = [ SUT, SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 2, fullPrice: 100, specialPrice: 100 };
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});

test('A x 3 no rule', () => {
  // SETUP
  const SUT = "A";
  let checkoutList = [ SUT, SUT, SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 3, fullPrice: 150, specialPrice: 150 };
  
  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});

test('B x 1', () => {
  // SETUP
  const SUT = "B";
  let checkoutList = [ SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 1, fullPrice: 30, specialPrice: 30 };

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});

test('B x 2 no rule', () => {
  // SETUP
  const SUT = "B";
  let checkoutList = [ SUT, SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 2, fullPrice: 60, specialPrice: 60 };

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});

test('C x 1', () => {
  // SETUP
  const SUT = "C";
  let checkoutList = [ SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 1, fullPrice: 20, specialPrice: 20 };

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});

test('D x 1', () => {
  // SETUP
  const SUT = "D";
  let checkoutList = [ SUT ];
  let expectedResult: ICheckout = {};
  expectedResult[SUT] = { quantity: 1, fullPrice: 15, specialPrice: 15 };

  // EXERCISE
  const actualResult = Checkout(checkoutList, CATALOGUE);

  // ASSERT
  expect(actualResult[SUT].quantity).toEqual(expectedResult[SUT].quantity);
  expect(actualResult[SUT].fullPrice).toEqual(expectedResult[SUT].fullPrice);
  expect(actualResult[SUT].specialPrice).toEqual(expectedResult[SUT].specialPrice);
});
