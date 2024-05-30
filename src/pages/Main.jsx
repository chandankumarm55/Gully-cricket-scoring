import React from 'react';
import Header from '../components/Header';
import ScoreBoard from '../components/ScoreBoard';
import { useSelector } from 'react-redux';
import Interval from '../components/Interval';
import Result from '../components/Result';
import './Main.css'
const Main = () => {
    const { decision } = useSelector(store => store.decision);
    const { winner } = useSelector(store => store.decision);

    return (
        <div className='main-container'>
            { winner && winner !== null ? (
                <Result />
            ) : (
                <>

                    { decision.fristInnigsDone === true ? (
                        <Interval />
                    ) : (
                        <>
                            <Header />
                            <ScoreBoard />
                        </>
                    ) }
                </>
            ) }
        </div>
    );
};

export default Main;
