import { PageTemplate } from "../../Components/PageTemplate/PageTemplate";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { TotalPrice } from "../../Components/TotalPrice/TotalPrice";
import { CalculateCheckout } from "../../Domain/CalculateCheckout";
import { ICheckout, TotalCheckout } from "../../Models/CheckoutItem";
import { IProduct } from "../../Models/Product";
import { RuleFactory } from "../../Models/RuleFactory";
import { IRuleSet } from "../../Models/Rules";
import { addProduct, removeProduct } from "../../Redux/CheckoutSlicer";
import { useAppSelector, useAppDispatch } from "../../Redux/Hooks";

export const Checkout = () => {
    const dispatch = useAppDispatch();
    const catalogue = useAppSelector(state => state.products.catalogue);
    const checkoutList = useAppSelector(state => state.checkout.list);
    const rules = useAppSelector(state => state.rules.rules);

    const ruleSet: IRuleSet = RuleFactory.create(rules);
    const calculatedCheckout: TotalCheckout = CalculateCheckout(checkoutList, catalogue, ruleSet);

    return <PageTemplate title={"Checkout"}>
                    <div>
                        <TotalPrice checkout={calculatedCheckout}/>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {Object.keys(catalogue).map((productId) => {
                            const product : IProduct = catalogue[productId];

                            // count number of productId in checkoutList
                            const numberOfItems = checkoutList.filter((item) => item === productId).length;

                            return (<ProductCard key={product.id} product={product}>
                                        <div className="inline-flex justify-between items-center w-full bg-slate-100 mt-3">
                                            <button onClick={() => dispatch(removeProduct(productId))}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                                                -
                                            </button>
                                            
                                            <span className="w-full text-center m-2">{numberOfItems}</span>

                                            <button onClick={() => dispatch(addProduct(productId))}
                                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                                                +
                                            </button>
                                        </div>
                                    </ProductCard>)
                        })}
                        </div>
                    </div>
            </PageTemplate>
};