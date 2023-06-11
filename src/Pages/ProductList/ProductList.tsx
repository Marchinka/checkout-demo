import { PageTemplate } from "../../Components/PageTemplate/PageTemplate";
import { ProductEditModal } from "../../Components/ProductEditModal/ProductEditModal";
import { ProductTableList } from "../../Components/ProductTableList/ProductTableList";
import { useAppSelector } from "../../Redux/Hooks";

export const ProductList = () => {
    const catalogue = useAppSelector(state => state.products.catalogue);
    const items = Object.keys(catalogue).map((productId) => catalogue[productId]);

    return <PageTemplate title={"Product List"}>
                <ProductTableList items={items} />
                <ProductEditModal />
            </PageTemplate>
}; 