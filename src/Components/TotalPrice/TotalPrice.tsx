import { TotalCheckout } from "../../Models/CheckoutItem";

export const TotalPrice = (props: { checkout: TotalCheckout }) => {    
    const discounted = props.checkout.totalFinalPrice != props.checkout.totalFullPrice;
    return (<div>
                <p>
                    <span className="text-2xl font-bold tracking-tight text-indigo-700">Total Price</span>
                </p>
                <p>
                    <span className="text-4xl font-bold tracking-tight text-gray-900">€ {props.checkout.totalFinalPrice}</span>
                    &nbsp;
                    {discounted && <span className="text-2xl tracking-tight text-gray-400 line-through">€ {props.checkout.totalFullPrice}</span>}
                </p>
            </div>)
}