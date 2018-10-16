import React from "react";
import { Link } from "react-router-dom";
import GamePreview from "./GamePreview";

const Games = ({ games }) => (
    <div>
        <h2>Games</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridGap: '5px'}}>
            { games.map(({ id, name, logoUrl }) => (
                <Link key={id} to={`/games/${id}`} >
                    <GamePreview name={name} logoUrl={logoUrl} />
                </Link>
            ))}
        </div>
    </div>
)

export default Games;