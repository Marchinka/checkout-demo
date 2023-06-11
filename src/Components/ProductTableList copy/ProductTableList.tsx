import { TotalCheckout } from "../../Models/CheckoutItem";
import { IProduct } from "../../Models/Product";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAppDispatch } from "../../Redux/Hooks";
import { deleteProduct } from "../../Redux/ProductSlicer";

export const ProductTableList = (props: { items: IProduct[] }) => {    
    const dispatch = useAppDispatch();

    const CELL_CLASS = "px-6 py-4";

    return (<div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className={CELL_CLASS}>
                                Product Id
                            </th>
                            <th scope="col" className={CELL_CLASS}>
                                Price (€)
                            </th>
                            <th scope="col" className={CELL_CLASS}>
                                Image
                            </th>
                            <th scope="col" className={CELL_CLASS}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((item) => {
                            return (<tr key={item.id} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.img}
                                                    className="h-12 w-12 object-cover"
                                                />
                                                {item.img}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                            <button onClick={() => dispatch(deleteProduct(item.id))}
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                <TrashIcon className="block h-4 w-4"/>
                                            </button>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                                <PencilIcon className="block h-4 w-4"/>
                                            </button>
                                            </div>
                                        </td>
                                    </tr>)
                        })}
                    </tbody>
                </table>
            </div>)
}