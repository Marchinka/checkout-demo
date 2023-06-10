import { PageTemplate } from "../../Components/PageTemplate/PageTemplate";
import { useAppSelector } from "../../Redux/Hooks";

export const ProductList = () => {
    const catalogue = useAppSelector(state => state.products.catalogue);

    return <PageTemplate title={"Product List"}>
                {Object.keys(catalogue).map((productId) => {
                    const product = catalogue[productId];
                    return <div key={productId}>Product {product.id}</div>;
                })}
            </PageTemplate>
}; 