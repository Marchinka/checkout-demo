import { useCallback, useEffect, useMemo } from "react"
import { AppRepository } from "../../Domain/AppRepository";
import { useAppDispatch } from "../../Redux/Hooks";
import { setCatalogue } from "../../Redux/ProductSlicer";
import { setRules } from "../../Redux/RulesSlicer";
import { setCheckout } from "../../Redux/CheckoutSlicer";
import { IProduct } from "../../Models/Product";

export const ProductCard = (props: { product: IProduct, children?: React.ReactNode }) => {    
    
    return (<div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img
                  src={props.product.img}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
              </div>
              <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                        Product {props.product.id}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">This is product {props.product.id}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{props.product.price} €</p>
              </div>
              {props.children}
            </div>)
}