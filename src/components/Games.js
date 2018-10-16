import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGames } from "../actions";
import { getGames, shouldLoadGames } from "../reducers";
import GamePreview from "./GamePreview";

class Games extends React.Component {

    componentDidMount() {
        if (this.props.shouldLoadGames) {
            this.props.fetchGames();
        }
    }

    render( ) {
        const { games } = this.props;

        return (
            <div>
                <h2>Games</h2>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridGap: '5px'}}>
                    { games.map(({ id, name, logoUrl }) => (
                        <Link key={id} to={`/games/${id}`} >
                            <GamePreview name={name} logoUrl={logoUrl} />
                        </Link>
                    ) ) }
                </div>
            </div>
        );
    }
}

Games.serverFetch = fetchGames; // static declaration of data requirements

const mapStateToProps = (state) => ({
    games: getGames(state),
    shouldLoadGames: shouldLoadGames(state)
});

const mapDispatchToProps = {
    fetchGames
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
