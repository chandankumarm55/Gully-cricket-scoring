import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setMatchToss } from '../redux/matchToss';
import { useNavigate } from 'react-router-dom';
import './Toss.css';

const Toss = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { teamDetails } = useSelector(store => store.teamDetails);
    const [tossWinner, setTossWinner] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleTossWinnerSelect = (option) => {
        setTossWinner(option);
    };

    const handleStartMatch = () => {
        if (tossWinner == null || selectedOption == null) {
            toast.error('Please select the options');
            return;
        }

        const firstBattingTeam = selectedOption === 'batting' ? tossWinner : tossWinner === teamDetails?.teamOne ? teamDetails?.teamSecond : teamDetails?.teamOne;
        const secondBattingTeam = firstBattingTeam === teamDetails?.teamOne ? teamDetails?.teamSecond : teamDetails?.teamOne;

        dispatch(setMatchToss({
            tossWinner,
            selectedOption,
            firstBattingTeam,
            secondBattingTeam,
            nowBatting: firstBattingTeam
        }));
        navigate('/main');
    };

    return (
        <div className="toss-container">
            <div className="heading">
                <h4>Who won the Toss?</h4>
            </div>
            <div className="team-selection">
                <div
                    className={ `team ${tossWinner === teamDetails?.teamOne ? "tossWinner" : ""}` }
                    onClick={ () => handleTossWinnerSelect(teamDetails?.teamOne) }
                >
                    <p>{ teamDetails?.teamOne }</p>
                </div>
                <div
                    className={ `team ${tossWinner === teamDetails?.teamSecond ? "tossWinner" : ""}` }
                    onClick={ () => handleTossWinnerSelect(teamDetails?.teamSecond) }
                >
                    <p>{ teamDetails?.teamSecond }</p>
                </div>
            </div>
            <div className="options-container">
                <p>They choose to:</p>
                <div className="options">
                    <div
                        className={ `option ${selectedOption === 'batting' ? 'selectedOption' : ''}` }
                        onClick={ () => setSelectedOption('batting') }
                    >
                        <img
                            src='https://www.wikihow.com/images/thumb/a/a4/Improve-Your-Batting-in-Cricket-Step-2-Version-6.jpg/v4-460px-Improve-Your-Batting-in-Cricket-Step-2-Version-6.jpg.webp'
                            alt='Batting'
                        />
                    </div>
                    <div
                        className={ `option ${selectedOption === 'bowling' ? 'selectedOption' : ''}` }
                        onClick={ () => setSelectedOption('bowling') }
                    >
                        <img
                            src='https://www.shutterstock.com/shutterstock/photos/2196786439/display_1500/stock-vector-cricket-player-fielder-position-stock-illustration-as-eps-file-2196786439.jpg'
                            alt='Fielding'
                        />
                    </div>
                </div>
            </div>
            <div className="start-button-container">
                <button
                    className="start-button"
                    onClick={ handleStartMatch }
                    disabled={ !selectedOption || !tossWinner }
                >
                    Start the match
                </button>
            </div>
        </div>
    );
};

export default Toss;
