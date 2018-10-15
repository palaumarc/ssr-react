import Games from "./components/Games";
import GameDetail from "./components/GameDetail";

export default [
    {
        path: "/",
        component: Games,
        exact: true,
    },
    {
        path: "/games/:id",
        component: GameDetail,
        exact: true,
    }
];
