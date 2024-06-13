import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setTeamDetails } from '../redux/teamslice';
import { useNavigate } from 'react-router-dom';
import './TeamDetails.css';
import { Button, TextField } from '@mui/material';

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
                        <TextField
                            type="text"

                            label="Team 1"
                            variant="standard"
                            className="input"
                            id="team1"

                            value={ teamOne }
                            onChange={ (e) => setTeamOne(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="team2" className="label">Team-02 Name</label>
                        <TextField
                            label="Team 2"
                            variant="standard"
                            className="input"
                            id="team2"

                            value={ teamSecond }
                            onChange={ (e) => setTeamSecond(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="overs" className="label">How Many Overs Match</label>
                        <TextField
                            label="Overs"
                            variant="standard"
                            type="number"
                            className="input"
                            id="overs"

                            value={ overs }
                            onChange={ (e) => setOvers(e.target.value) }
                        />
                    </div>
                    <div className="form-group">
                        <Button variant="outlined" type="submit" className="button">Next Toss</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamDetails;
