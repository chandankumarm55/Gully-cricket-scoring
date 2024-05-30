import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setTeamDetails } from '../redux/teamslice';
import { useNavigate } from 'react-router-dom';
import './TeamDetails.css';

const TeamDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [teamOne, setTeamOne] = useState('');
    const [teamSecond, setTeamSecond] = useState('');
    const [overs, setOvers] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!teamOne) {
            toast.error("Please enter Team 1 name.");
            return;
        }

        if (!teamSecond) {
            toast.error("Please enter Team 2 name.");
            return;
        }

        if (overs <= 0 || overs === null) {
            toast.error("Overs should be a positive number.");
            return;
        }

        dispatch(setTeamDetails({ teamOne, teamSecond, overs }));
        navigate('/toss');

        setTeamOne('');
        setTeamSecond('');
        setOvers('');
    };

    return (
        <div className='container'>


            <div className="teamdetails-container">
                <form onSubmit={ handleSubmit }>
                    <div className="row">
                        <h1>Gully-Cricket-Scoring</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="team1" className="label">Team-01 Name</label>
                        <input
                            type="text"
                            className="input"
                            id="team1"
                            placeholder="Enter Team 1 Name"
                            value={ teamOne }
                            onChange={ (e) => setTeamOne(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="team2" className="label">Team-02 Name</label>
                        <input
                            type="text"
                            className="input"
                            id="team2"
                            placeholder="Enter Team 2 Name"
                            value={ teamSecond }
                            onChange={ (e) => setTeamSecond(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="overs" className="label">How Many Overs Match</label>
                        <input
                            type="number"
                            className="input"
                            id="overs"
                            placeholder="Enter Number of Overs"
                            value={ overs }
                            onChange={ (e) => setOvers(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="button">Next Toss</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamDetails;
