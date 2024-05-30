import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetTeamDetails } from '../redux/teamslice';
import { resetMatchToss } from '../redux/matchToss';
import { resetScore } from '../redux/scoreSlice';
import { resetDecision } from '../redux/decsion';
import { useNavigate } from 'react-router-dom';
import './Result.css';

const Result = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teamDetails } = useSelector(store => store.teamDetails);
    const { matchToss } = useSelector(store => store.matchToss);
    const { decision, winner } = useSelector(store => store.decision);

    const handleClick = () => {
        dispatch(resetTeamDetails());
        dispatch(resetMatchToss());
        dispatch(resetScore());
        dispatch(resetDecision());
        navigate('/');
    };

    return (
        <div className="result-container">
            <div className="result-card">
                <div className="result-header">
                    <h2>Match Result</h2>
                </div>
                <div className="result-body">
                    <p>{ matchToss?.tossWinner } won the toss and chose to { matchToss?.selectedOption } first</p>
                    <div className="result-row">
                        <p><strong>{ teamDetails?.teamOne } </strong> vs <strong>{ teamDetails?.teamSecond } </strong></p>

                    </div>
                    <div className="result-row">
                        <p>{ matchToss?.firstBattingTeam } = { decision?.firstBattingScore } / { decision?.firstBattingWicket }</p>
                        <p>{ matchToss?.secondBattingTeam } = { decision?.secondBattingScore } / { decision?.secondBattingWicket }</p>
                    </div>
                    <div className="result-row">
                        <p>{ winner } won the match</p>
                        <button className="result-button" onClick={ handleClick }>Next match</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
