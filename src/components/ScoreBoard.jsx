import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBall, addExtra, addWicket, endInnings } from '../redux/scoreSlice';
import './ScoreBoard.css';
import { setMatchToss } from '../redux/matchToss';
import { setDecision, setWinner } from '../redux/decsion';

const ScoreBoard = () => {
    const dispatch = useDispatch();
    const { teamDetails } = useSelector(store => store.teamDetails);
    const { matchToss } = useSelector(store => store.matchToss);
    const { currentScore, currentTeam, wickets, ballCount, currentOver, currentOverScore, currentOverRuns, teamScores } = useSelector(store => store.score);
    const { decision } = useSelector(store => store.decision);

    const overs = currentOver + ballCount / 10;
    const formattedOvers = overs.toFixed(1);

    useEffect(() => {
        //frist batting overs completed 
        if (currentTeam === 1 && (parseFloat(formattedOvers) >= parseFloat(teamDetails.overs) || wickets === 10)) {
            dispatch(setDecision({ fristInnigsDone: true }));
            dispatch(setMatchToss({ nowBatting: matchToss.secondBattingTeam }));
            dispatch(setDecision({ target: currentScore, firstBattingScore: currentScore, firstBattingWicket: wickets }));
            dispatch(endInnings());
        }
        if (currentTeam === 2 && parseFloat(formattedOvers) >= parseFloat(teamDetails.overs) && currentScore < decision.target) {
            dispatch(setWinner(matchToss.firstBattingTeam));
            dispatch(setDecision({
                secondBattingScore: currentScore, secondBattingWicket: wickets
            }));
        }
        if (currentTeam === 2 && parseFloat(formattedOvers) >= parseFloat(teamDetails.overs) && currentScore === decision.target) {
            dispatch(setWinner('Draw'));
            dispatch(setDecision({
                secondBattingScore: currentScore, secondBattingWicket: wickets
            }));
        }

        if (currentTeam === 2 && currentScore > decision.target) {
            dispatch(setWinner(matchToss.nowBatting));
            dispatch(setDecision({
                secondBattingScore: currentScore, secondBattingWicket: wickets
            }));
        }
    }, [currentScore, formattedOvers, currentTeam, decision.target, teamDetails.overs, matchToss, wickets, dispatch]);

    const handleButtonClick = (type) => {
        if (currentTeam === 1 && parseFloat(formattedOvers) >= parseFloat(teamDetails.overs)) {
            return;
        }

        if (currentTeam === 2 && currentScore > decision.target) {
            return;
        }

        if (type === 'WD') {
            dispatch(addExtra('WD'));
        } else if (type === 'NB') {
            dispatch(addExtra('NB'));
        } else if (type === 'WICKET') {
            dispatch(addWicket());
        } else {
            dispatch(addBall(parseInt(type, 10)));
        }
    };

    return (
        <div className="score-board">
            <div className="score-info">
                <div>Team Name: <strong>{ matchToss.nowBatting } </strong></div>
                <div className="score-info-one">
                    <div>Current Score: { currentScore } / { wickets }</div>
                    <div>Overs: { formattedOvers }</div>
                </div>
                <div className="score-info-two">
                    <div>{ decision.target ? `Target: ${decision.target}` : '' }</div>
                    { decision.winner && <div>Winner: { decision.winner }</div> }
                </div>
            </div>
            <div className="button-grid">
                { ['0', '1', '2', '3', '4', '5', '6', 'WD', 'NB', 'WICKET'].map((run, index) => (
                    <button key={ index } onClick={ () => handleButtonClick(run) }>{ run }</button>
                )) }
            </div>
            <div>
                <div className="current-over-score">Current Over Score : { currentOverRuns ? ` ${currentOverRuns}` : null }</div>
                <div className="each-ball-summary">Each Ball Summary</div>
                <div className="ball-to-ball">
                    { Array.isArray(currentOverScore) && currentOverScore.map((val, index) => (
                        <button key={ index }>{ val }</button>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
