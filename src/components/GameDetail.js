import React from "react";

const GameDetail = ({ game, lastRun }) => (
    <div style={{width: 'fit-content', padding: '10px', border: '1px solid grey', display: 'grid', gridTemplateColumns: 'min-content max-content', placeItems: 'center', gridColumnGap: '5px'}} >
        <div style={{display: 'grid', gridRowGap: '10px', gridTemplateRows: '80% 20%', placeItems: 'center'}} >
            <img alt={game.name} src={game.logoUrl} />
            {game.name}
        </div>
        <div style={{display: 'grid', gridRowGap: '10px', gridTemplateRows: 'auto auto auto', placeItems: 'start / center'}} >
            <button style={{ cursor: 'pointer', border: 'none', textAlign: 'center', borderRadius: '4px', backgroundColor: '#008CBA', fontSize: '20px'}}><a style={{ color: 'white', textDecoration: 'none' }}href={lastRun.videoUrl}>Video</a></button>
            <span>Player: {lastRun.playerName}</span>
            <span>Time: {lastRun.duration.minutes()} m {lastRun.duration.seconds()} s</span>
        </div>
    </div>
)

export default GameDetail;