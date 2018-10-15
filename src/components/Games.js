import React from "react";
import { connect } from "react-redux";
import { fetchGames } from "../actions";

class Games extends React.Component {

    render( ) {
        const { games } = this.props;

        return (
            <div>
                <h2>Games</h2>
                <ul>
                    { games.map( ( { id, names, assets } ) => (
                        <li key={ id } >
                            { names.international } - <img src={assets["cover-tiny"].uri} />
                        </li>
                    ) ) }
                </ul>
            </div>
        );
    }
}

Games.serverFetch = fetchGames; // static declaration of data requirements

const mapStateToProps = ( state ) => ( {
    games: state.games,
} );

export default connect(mapStateToProps)(Games);
