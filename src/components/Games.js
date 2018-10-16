import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGames } from "../actions";
import { getGames, shouldLoadGames } from "../reducers";

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
                <ul>
                    { games.map(({ id, names, assets }) => (
                        <Link key={id} to={`/games/${id}`} >
                            { names.international } - <img src={assets["cover-tiny"].uri} />
                        </Link>
                    ) ) }
                </ul>
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
