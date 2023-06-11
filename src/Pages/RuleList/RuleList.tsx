import { PageTemplate } from "../../Components/PageTemplate/PageTemplate";
import { RuleEditModal } from "../../Components/RuleEditModal/RuleEditModal";
import { RuleTableList } from "../../Components/RuleTableList/RuleTableList";
import { IRuleDto } from "../../Models/Rules";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import { editRule, toggleModal } from "../../Redux/RulesSlicer";

export const RuleList = () => {
    const dispatch = useAppDispatch();
    const rules = useAppSelector(state => state.rules.rules);

    const newRule = () => {
        dispatch(editRule({} as IRuleDto));
        dispatch(toggleModal(true));
    };

    return <PageTemplate title={"Rule List"}>
                <RuleTableList items={rules} />
                <RuleEditModal />
                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={() => newRule()}
                        >
                            New Rule
                    </button>
                </div>
            </PageTemplate>
}; 