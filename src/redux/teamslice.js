import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teamDetails: null,
};

const teamSlice = createSlice({
    name: 'teamDetails',
    initialState,
    reducers: {
        setTeamDetails: (state, action) => {
            state.teamDetails = action.payload;
        },
        resetTeamDetails: () => initialState,
    },
});

export const { setTeamDetails, resetTeamDetails } = teamSlice.actions;
export default teamSlice.reducer;