import { PageTemplate } from "../../Components/PageTemplate/PageTemplate";
import Product from "../../Models/Product";
import { useAppSelector } from "../../Redux/Hooks";

export const ProductList = () => {
    const products: Product[] = useAppSelector(state => state.products.list);

    return <PageTemplate title={"Product List"}>
                <div>Product list</div>
                {products.map(product => <div key={product.id}>{product.id}</div>)}
            </PageTemplate>
}; 