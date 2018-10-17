import React from "react";
import PropTypes from 'prop-types';

const contentDivStyles = {
    width: 'fit-content',
    padding: '10px',
    border: '1px solid grey',
    display: 'grid',
    gridTemplateColumns: 'min-content max-content',
    placeItems: 'center',
    gridColumnGap: '5px'
};

const gameDivStyles = {
    display: 'grid',
    gridRowGap: '10px',
    gridTemplateRows: '80% 20%',
    placeItems: 'center'
}

const runDivStyles = {
    display: 'grid',
    gridRowGap: '10px',
    gridTemplateRows: 'auto auto auto',
    placeItems: 'start / center'
}

const videoButtonStyles = {
    cursor: 'pointer',
    border: 'none',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: '#008CBA',
    fontSize: '20px'
}

const GameDetail = ({ game, lastRun }) => (
    <div style={contentDivStyles} >
        <div style={gameDivStyles} >
            <img alt={game.name} src={game.logoUrl} />
            {game.name}
        </div>
        <div style={runDivStyles} >
            <button style={videoButtonStyles}><a style={{ color: 'white', textDecoration: 'none' }} href={lastRun.videoUrl}>Video</a></button>
            <span>Player: {lastRun.playerName}</span>
            <span>Time: {lastRun.duration.minutes()} m {lastRun.duration.seconds()} s</span>
        </div>
    </div>
)

GameDetail.propTypes = {
    game: PropTypes.shape({
        name: PropTypes.string,
        logoUrl: PropTypes.string,
    }).isRequired,
    lastRun: PropTypes.shape({
        playerName: PropTypes.string,
        videoUrl: PropTypes.string,
        duration: PropTypes.object
    }).isRequired,
};

export default GameDetail;