import { duplicateValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateTriggerProps = {
  trigger?: {
    type?: "COMMENT" | "DM";
    keyword?: string;
    types?: string[];
    keywords?: string[];
  };
};

const initialState: InitialStateTriggerProps = {
  trigger: {
    type: undefined,
    keyword: undefined,
    types: [],
    keywords: [],
  },
};

export const AUTOMATION = createSlice({
  name: "automation",
  initialState,
  reducers: {
    TRIGGER: (state, action: PayloadAction<InitialStateTriggerProps>) => {
      const type = action.payload.trigger?.types;
      if (type) {
        // Update the state's `types` array using `duplicateValidation`
        state.trigger!.types = duplicateValidation(state.trigger!.types, type);
      }
    },
  },
});

export const { TRIGGER } = AUTOMATION.actions;

export default AUTOMATION.reducer;
