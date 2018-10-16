import React from "react";
import { connect } from "react-redux";
import { getGames, getGameRuns } from "../reducers";
import moment from "moment";
import { loadGameDetail, resetGameRuns } from "../actions";
import { Link } from "react-router-dom";

class GameDetail extends React.Component {

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

        return (
            <div>
                <Link to="/"><button>Games</button></Link>
                Name: {selectedGame.names.international}
                Logo: <img alt={selectedGame.names.international} src={selectedGame.assets["cover-tiny"].uri} />
                <a href={lastRun.videos.links[0].uri}><button>Video</button></a>
                Player: {lastRun.players[0].name || lastRun.players[0].id}
                Time: {lastRunDuration.minutes()} m {lastRunDuration.seconds()} s
            </div>
        );

    }

}

GameDetail.serverFetch = (params) => loadGameDetail(params.id); // static declaration of data requirements

const mapStateToProps = (state) => ( {
    games: getGames(state),
    gameRuns: getGameRuns(state)
});

const mapDispatchToProps = {
    loadGameDetail,
    resetGameRuns
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
