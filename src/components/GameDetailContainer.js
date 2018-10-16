import React from "react";
import { connect } from "react-redux";
import { getGameById, shouldLoadGames, getLastGameRun, shouldLoadGameRuns } from "../reducers";
import moment from "moment";
import { loadGameDetail, resetGameRuns } from "../actions";
import { Link } from "react-router-dom";

import GameDetail from "./GameDetail"

class GameDetailContainer extends React.Component {

    componentDidMount() {
        if (this.props.shouldLoadGames || this.props.shouldLoadGameRuns) {
            this.props.loadGameDetail(this.props.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.resetGameRuns();
    }

    render() {

        const { lastRun, game } = this.props;

        if (!game || !lastRun) {
            return null;
        }

        const lastRunDuration = moment.duration(lastRun.duration);

        const lastRunInfo = {
            videoUrl: lastRun.videoUrl,
            playerName: lastRun.playerName,
            duration: lastRunDuration
        }

        const gameInfo = {
            name: game.name,
            logoUrl: game.logoUrl
        }

        return (
            <div>
                <Link to="/"><button>Games</button></Link>
                <GameDetail
                    game={gameInfo}
                    lastRun={lastRunInfo}
                />
            </div>
        );

    }

}

GameDetailContainer.serverFetch = (params) => loadGameDetail(params.id); // static declaration of data requirements

const mapStateToProps = (state, props) => ( {
    game: getGameById(state, props.match.params.id),
    lastRun: getLastGameRun(state),
    shouldLoadGameRuns: shouldLoadGameRuns(state),
    shouldLoadGames: shouldLoadGames(state)
});

const mapDispatchToProps = {
    loadGameDetail,
    resetGameRuns
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetailContainer);
