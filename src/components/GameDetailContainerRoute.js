import React from "react";
import GameDetailContainer from "./GameDetailContainer"

const GameDetailContainerRoute = (props) => <GameDetailContainer gameId={props.match.params.id} />
GameDetailContainerRoute.serverFetch = GameDetailContainer.serverFetch;

export default GameDetailContainerRoute;