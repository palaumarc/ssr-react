import React from "react";
import { connect } from "react-redux";
import { getGames, getGameRuns } from "../reducers";
import moment from "moment";
import { loadGameDetail, resetGameRuns } from "../actions";
import { Link } from "react-router-dom";

import GameDetail from "./GameDetail"

class GameDetailContainer extends React.Component {

    componentDidMount() {

        if (this.props.games.length === 0 || this.props.gameRuns.length === 0) {
            this.props.loadGameDetail(this.props.match.params.id);
        }

    }

    componentWillUnmount() {
        this.props.resetGameRuns();
    }

    render() {

        const lastRun = this.props.gameRuns[0];
        const selectedGame = this.props.games.find(game => game.id === this.props.match.params.id);

        if (!selectedGame || !lastRun) {
            return null;
        }

        const lastRunDuration = moment.duration(lastRun.times.primary);
        const gameName = selectedGame.names.international;
        const gameLogoUrl = selectedGame.assets["cover-tiny"].uri;
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

const mapStateToProps = (state) => ( {
    games: getGames(state),
    gameRuns: getGameRuns(state)
});

const mapDispatchToProps = {
    loadGameDetail,
    resetGameRuns
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetailContainer);
