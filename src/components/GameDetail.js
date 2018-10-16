import React from "react";

const GameDetail = ({ game, lastRun }) => (
    <div>
        Name: {game.name}
        Logo: <img alt={game.name} src={game.logoUrl} />
        <a href={lastRun.videoUrl}><button>Video</button></a>
        Player: {lastRun.playerName}
        Time: {lastRun.duration.minutes()} m {lastRun.duration.seconds()} s
    </div>
)

export default GameDetail;