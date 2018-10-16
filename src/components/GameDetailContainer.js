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

        const lastRunDuration = moment.duration(lastRun.times.primary);
        const gameName = game.names.international;
        const gameLogoUrl = game.assets["cover-tiny"].uri;
        const lastRunVideoUrl = lastRun.videos.links[0].uri;
        const lastRunPlayerName = lastRun.players[0].name || lastRun.players[0].id;

        const gameInfo = {
            name: gameName,
            logoUrl: gameLogoUrl
        };

        const lastRunInfo = {
            videoUrl: lastRunVideoUrl,
            playerName: lastRunPlayerName,
            duration: lastRunDuration
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
