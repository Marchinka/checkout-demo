import { useCallback, useEffect, useMemo } from "react"
import { AppRepository } from "../../Domain/AppRepository";
import { useAppDispatch } from "../../Redux/Hooks";
import { setProducts } from "../../Redux/Products/ProductSlicer";

export const Bootstrapper = (props: { children: React.ReactNode }) => {    
    const dispatch = useAppDispatch();

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
            dispatch(setProducts(catalogue));
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