import React from "react";
import { connect } from "react-redux";
import { getGames } from "../reducers";
import { fetchGames } from "../actions";
import { Link } from "react-router-dom";

class GameDetail extends React.Component {

    componentDidMount() {
        if (this.props.games.length === 0) {
            this.props.fetchGames();
        }
    }

    render() {

        const selectedGame = this.props.games.find(game => game.id === this.props.match.params.id);

        return (
            <div>
                <Link to="/"><button>Games</button></Link>
                Name: {selectedGame.names.international}
                Logo: <img alt={selectedGame.names.international} src={selectedGame.assets["cover-tiny"].uri} />
            </div>
        );

    }

}

GameDetail.serverFetch = fetchGames; // static declaration of data requirements

const mapStateToProps = (state) => ( {
    games: getGames(state)
});

const mapDispatchToProps = {
    fetchGames
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
