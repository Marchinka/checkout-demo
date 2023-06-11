import { useCallback, useEffect, useMemo } from "react"
import { AppRepository } from "../../Domain/AppRepository";
import { useappDispatch } from "../../Redux/Hooks";
import { setCatalogue } from "../../Redux/ProductSlicer";
import { setRules } from "../../Redux/RulesSlicer";
import { setCheckout } from "../../Redux/CheckoutSlicer";

export const Bootstrapper = (props: { children: React.ReactNode }) => {    
    const dispatch = useappDispatch();

    const fecthInitialData = () => {
        const fetchData = async () => {
            const pCatalogue = AppRepository.getCatalogue();  
            const pRules = AppRepository.getRules();
            const pCheckoutList = AppRepository.getCheckoutList(); 
            const [catalogue, rules, checkoutList] = await Promise.all([pCatalogue, pRules, pCheckoutList]);
            return { catalogue, rules, checkoutList };
        };
      
        fetchData()
          .then(({ catalogue, rules, checkoutList }) => {
            dispatch(setCatalogue(catalogue));
            dispatch(setRules(rules));
            dispatch(setCheckout(checkoutList));
          })
          .catch(console.error);
    };


    useEffect(() => {
        fecthInitialData();
      }, []);

    return (
        <>
            {props.children}
        </>
    )
}