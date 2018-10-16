import React from "react";
import { connect } from "react-redux";
import { fetchGames } from "../actions";
import { getGames, shouldLoadGames } from "../reducers";
import Games from "./Games";

class GamesContainer extends React.Component {

    componentDidMount() {
        if (this.props.shouldLoadGames) {
            this.props.fetchGames();
        }
    }

    render() {
        const { games } = this.props;
        return <Games games={games} />
    }
}

GamesContainer.serverFetch = fetchGames; // static declaration of data requirements

const mapStateToProps = (state) => ({
    games: getGames(state),
    shouldLoadGames: shouldLoadGames(state)
});

const mapDispatchToProps = {
    fetchGames
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);
