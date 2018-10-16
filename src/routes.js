import GameDetailContainer from "./components/GameDetailContainer";
import GamesContainer from "./components/GamesContainer";

export default [
    {
        path: "/",
        component: GamesContainer,
        exact: true,
    },
    {
        path: "/games/:id",
        component: GameDetailContainer,
        exact: true,
    }
];
