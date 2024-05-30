import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ballCount: 0,
    currentScore: 0,
    currentOver: 0,
    currentOverRuns: 0,
    totalScore: 0,
    wickets: 0,
    currentOverScore: [],
    overBalls: [],
    currentTeam: 1,
    teamScores: [
        [],
        []
    ],
};

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        addBall: (state, action) => {
            state.ballCount += 1;
            state.currentScore += action.payload;
            state.currentOverScore.push(action.payload);
            state.overBalls.push(action.payload);
            state.currentOverRuns += action.payload;

            if (state.ballCount === 6) {
                state.teamScores[state.currentTeam - 1].push([...state.overBalls]);
                state.overBalls = [];
                state.ballCount = 0;
                state.currentOver += 1;
                state.currentOverRuns = 0;
            }
        },
        addWicket: (state) => {
            state.ballCount += 1;
            state.wickets += 1;
            state.currentOverScore.push('W');
            state.overBalls.push('W');

            if (state.ballCount === 6) {
                state.teamScores[state.currentTeam - 1].push([...state.overBalls]);
                state.overBalls = [];
                state.ballCount = 0;
                state.currentOver += 1;
                state.currentOverRuns = 0;
            }
        },
        addExtra: (state, action) => {
            const extraType = action.payload === 'WD' ? 'WD' : 'NB';
            state.currentScore += 1;
            state.currentOverScore.push(extraType);
        },
        endOver: (state) => {
            if (state.ballCount !== 0) {
                state.teamScores[state.currentTeam - 1].push([...state.overBalls]);
                state.overBalls = [];
                state.ballCount = 0;
                state.currentOver += 1;
                state.currentOverRuns = 0;
            }
        },
        endInnings: (state) => {
            state.teamScores[state.currentTeam - 1] = [...state.teamScores[state.currentTeam - 1], ...state.overBalls];
            state.ballCount = 0;
            state.currentOverScore = [];
            state.currentScore = 0;
            state.currentOver = 0;
            state.currentOverRuns = 0;
            state.totalScore = 0;
            state.wickets = 0;
            state.overBalls = [];
            state.currentTeam = state.currentTeam === 1 ? 2 : 1;
        },
        resetScore: () => initialState,
    },
});

export const { addBall, addWicket, addExtra, endOver, endInnings, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;