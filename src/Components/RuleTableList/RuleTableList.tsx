import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAppDispatch } from "../../Redux/Hooks";
import { IRuleDto } from "../../Models/Rules";
import { deleteRule, editRule, toggleModal } from "../../Redux/RulesSlicer";

export const RuleTableList = (props: { items: IRuleDto[] }) => {    
    const dispatch = useAppDispatch();

    const toggleEditRule = (rule: IRuleDto) => {
        dispatch(editRule(rule));
        dispatch(toggleModal(true));
    };

    const CELL_CLASS = "px-6 py-4";

    return (<div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className={CELL_CLASS}>
                                Product Id
                            </th>
                            <th scope="col" className={CELL_CLASS}>
                                Type
                            </th>
                            <th scope="col" className={CELL_CLASS}>
                                Properties
                            </th>
                            <th scope="col" className={CELL_CLASS}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((item) => {
                            return (<tr key={item.productId} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.productId}
                                        </th>
                                        <td className="px-6 py-4 capitalize">
                                            {item.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {Object.keys(item.payload).map(key => {
                                                return (<div key={key}>
                                                            <span className="font-medium capitalize">{key}</span>: {item.payload[key]}
                                                        </div>)
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                            <button onClick={() => dispatch(deleteRule(item.productId))}
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                <TrashIcon className="block h-4 w-4"/>
                                            </button>
                                            <button onClick={() => toggleEditRule(item)}
                                                    className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
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