import {
    home,
    gameDetail
} from "./paths"

import GameDetailContainerRoute from "../components/GameDetailContainerRoute";
import GamesContainer from "../components/GamesContainer";

export default [
    {
        path: home.path,
        component: GamesContainer,
        exact: true,
    },
    {
        path: gameDetail.path,
        component: GameDetailContainerRoute,
        exact: true,
    }
];