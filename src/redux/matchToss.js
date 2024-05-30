import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    matchToss: {
        nowBatting: null,
        tossWinner: null,
        selectedOption: null,
        firstBattingTeam: null,
        secondBattingTeam: null,
    },
};

const matchTossSlice = createSlice({
    name: 'matchToss',
    initialState,
    reducers: {
        setMatchToss: (state, action) => {
            state.matchToss = {...state.matchToss, ...action.payload };
        },
        resetMatchToss: () => initialState,
    },
});

export const { setMatchToss, resetMatchToss } = matchTossSlice.actions;
export default matchTossSlice.reducer;