import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './Store'
import { IRuleDto, IRuleSet } from '../Models/Rules';

interface RulesState {
  rules: IRuleDto[];
}

const initialState: RulesState = {  
    rules: []
};

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setRuleSet: (state, action: PayloadAction<IRuleDto[]>) => {
      state.rules = action.payload
    },
  },
})

export const { setRuleSet: setRules } = rulesSlice.actions

export const selectRuleSet = (state: RootState) => state.rules.rules;

export default rulesSlice.reducer