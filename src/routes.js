import GameDetailContainerRoute from "./components/GameDetailContainerRoute";
import GamesContainer from "./components/GamesContainer";

export default [
    {
        path: "/",
        component: GamesContainer,
        exact: true,
    },
    {
        path: "/games/:id",
        component: GameDetailContainerRoute,
        exact: true,
    }
];
