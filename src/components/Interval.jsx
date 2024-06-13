import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDecision } from '../redux/decsion';
import './Interval.css';

const Interval = () => {
    const dispatch = useDispatch();

    const { teamDetails } = useSelector(store => store.teamDetails);
    const { matchToss } = useSelector(store => store.matchToss);
    const { decision } = useSelector(store => store.decision);

    return (
        <div className="interval-container">
            <div className="interval-card">
                <div className="interval-header">
                    <h5>First Innings Ended</h5>
                </div>
                <div className="interval-body">
                    <div className="interval-row">
                        <p>Team Name: <strong>{ matchToss.firstBattingTeam } </strong></p>

                    </div>
                    <div className="interval-row">
                        <p>Overs: { teamDetails.overs }.0</p>

                    </div>
                    <div className="interval-row">
                        <p>Runs: { decision.target }/{ decision?.firstBattingWicket }</p>
                        <p></p>
                    </div>
                    <div className="interval-row">
                        <p> { matchToss.secondBattingTeam } needs <strong>  { decision.target + 1 }</strong> to win` </p>
                    </div>
                    <div className="interval-row button-row">
                        <button className="interval-button" onClick={ () => dispatch(setDecision({ fristInnigsDone: false })) }>
                            Start Next Innings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interval;
