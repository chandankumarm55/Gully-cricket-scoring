import React from 'react';

const OverDisplay = ({ ballCount }) => {
    const calculateOver = (ballCount) => {
        const ballsInOver = ballCount % 6;
        const fullOvers = Math.floor(ballCount / 6);
        return `${fullOvers}.${ballsInOver}`;
    };

    return (
        <div className="over-display">
            Current Ball: { calculateOver(ballCount) }
        </div>
    );
};

export default OverDisplay;
