import React from "react";
import PropTypes from 'prop-types';
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

GamesContainer.propTypes = {
    shouldLoadGames: PropTypes.bool.isRequired,
    games: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            logoUrl: PropTypes.string,
            links: PropTypes.object
        })
    ).isRequired
};

const mapStateToProps = (state) => ({
    games: getGames(state),
    shouldLoadGames: shouldLoadGames(state)
});

const mapDispatchToProps = {
    fetchGames
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);
