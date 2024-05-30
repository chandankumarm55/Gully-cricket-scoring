import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
    const { teamDetails } = useSelector(store => store.teamDetails);
    const { matchToss } = useSelector(store => store.matchToss);

    return (
        <div className="header-container">
            <div className="header-row">
                <div className="header-col">
                    <h1>{ teamDetails.teamOne } VS { teamDetails.teamSecond }</h1>
                </div>
                <div className="header-col">
                    <p>Overs: { teamDetails.overs }</p>
                </div>
                <div className="header-col">
                    <p>{ matchToss?.tossWinner } won the toss and chose to { matchToss?.selectedOption } first</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
