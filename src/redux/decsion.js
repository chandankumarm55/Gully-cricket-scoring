import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    decision: {
        target: null,
        firstBattingScore: 0,
        firstBattingWicket: 0,
        secondBattingScore: 0,
        secondBattingWicket: 0,
    },
    winner: null,
};

const decisionSlice = createSlice({
    name: 'decision',
    initialState,
    reducers: {
        setDecision: (state, action) => {
            state.decision = {...state.decision, ...action.payload };
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },
        resetDecision: () => initialState,
    },
});

export const { setDecision, setWinner, resetDecision } = decisionSlice.actions;
export default decisionSlice.reducer;