import Games from "./components/Games";
import GameDetailContainer from "./components/GameDetailContainer";

export default [
    {
        path: "/",
        component: Games,
        exact: true,
    },
    {
        path: "/games/:id",
        component: GameDetailContainer,
        exact: true,
    }
];
