import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './Store'
import { IRuleDto, IRuleSet } from '../Models/Rules';

interface RulesState {
  rules: IRuleDto[];
  showEditModal: boolean;
  ruleInEdit: IRuleDto | null;
}

const initialState: RulesState = {  
    rules: [],
    showEditModal: false,
    ruleInEdit: null
};

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setRules: (state, action: PayloadAction<IRuleDto[]>) => {
      state.rules = action.payload
    },
    deleteRule: (state, action: PayloadAction<string>) => {
      state.rules = state.rules.filter(r => r.productId != action.payload);
    },
    upsertRule: (state, action: PayloadAction<{ productId: string, rule: IRuleDto}>) => {
      state.rules = state.rules.filter(r => r.productId != action.payload.rule.productId);
      state.rules.push(action.payload.rule);
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload;
    },
    editRule: (state, action: PayloadAction<IRuleDto>) => {
      state.ruleInEdit = action.payload;
    }
  },
})

export const { setRules,deleteRule, upsertRule, toggleModal, editRule} = rulesSlice.actions

export const selectRuleSet = (state: RootState) => state.rules.rules;

export default rulesSlice.reducer