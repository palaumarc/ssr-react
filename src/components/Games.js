import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import GamePreview from "./GamePreview";

const gameContainerDivStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridGap: '5px'
}

const Games = ({ games }) => (
    <div>
        <h2>Games</h2>
        <div style={gameContainerDivStyles}>
            { games.map(({ id, name, logoUrl }) => (
                <Link key={id} to={`/games/${id}`} >
                    <GamePreview name={name} logoUrl={logoUrl} />
                </Link>
            ))}
        </div>
    </div>
)

Games.propTypes = {
    games: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            logoUrl: PropTypes.string,
            links: PropTypes.object
        })
    ).isRequired
};

export default Games;