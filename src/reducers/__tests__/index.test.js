import {
    shouldLoadGames, 
    getGames, 
    getGameById, 
    shouldLoadGameRuns, 
    getGameRuns, 
    getLastGameRun 
} from "../index";

const gamesMock = [
    {
        id: 1, 
        names: { 
            international: "internationalName"
        }, 
        assets: { 
            "cover-large" : { 
                uri: "logoUri"
            }
        },
        links: [
            { rel: "runs", uri: "link1Uri" },
            { rel: "noruns", uri: "link2Url" },
        ]
    },
    {
        id: 2, 
        names: { 
            international: "internationalName2"
        }, 
        assets: { 
            "cover-large" : { 
                uri: "logo2Uri"
            }
        },
        links: [
            { rel: "runs", uri: "link21Uri" },
            { rel: "noruns", uri: "link22Url" },
        ]
    }];

const gameRunsMock = [
    {
        videos: {
            links: [
                {
                    uri: "link1Uri"
                }
            ]
        },
        players: [
            {
                id: "1",
                name: "player1Name"
            }
        ],
        times: {
            primary: 101
        }
    },
    {
        videos: {
            links: [
                {
                    uri: "link2Uri"
                }
            ]
        },
        players: [
            {
                id: "2"
            }
        ],
        times: {
            primary: 103
        }
    }
]

describe("shouldLoadGames", () => {
    it("should return true when games state is an empty array", () => {
        const state = {
            games: []
        };
        expect(shouldLoadGames(state)).toEqual(true);
    });
    it("should return false when games state is not an empty array", () => {
        const state = {
            games: gamesMock
        };
        expect(shouldLoadGames(state)).toEqual(false);
    });
});

describe("getGames", () => {
    it("should return expected structure", () => {
        const state = {
            games: gamesMock
        };

        const expectedGames = [
            {
                id: 1,
                name: "internationalName",
                logoUrl: "logoUri",
                links: {
                    runs: "link1Uri"
                }
            },
            {
                id: 2,
                name: "internationalName2",
                logoUrl: "logo2Uri",
                links: {
                    runs: "link21Uri"
                }
            }
        ];

        expect(getGames(state)).toEqual(expectedGames);
    });
});

describe("getGameById", () => {
    it("should return expected structure when gameId is found in games array", () => {
        const gameId = 1;
        const state = {
            games: gamesMock
        };

        const expectedGame = {
            id: 1,
            name: "internationalName",
            logoUrl: "logoUri",
            links: {
                runs: "link1Uri"
            }
        };
    
        expect(getGameById(state, gameId)).toEqual(expectedGame);
    });

    it("should return undefined when gameId is not found in games array", () => {
        const gameId = 38272;
        const state = {
            games: gamesMock
        };
    
        expect(getGameById(state, gameId)).toEqual(undefined);
    });
});

describe("shouldLoadGameRuns", () => {
    it("should return true when gameRuns state is an empty array", () => {
        const state = {
            gameRuns: []
        };
        expect(shouldLoadGameRuns(state)).toEqual(true);
    });
    it("should return false when gameRuns state is not an empty array", () => {
        const state = {
            gameRuns: [{}]
        };
        expect(shouldLoadGameRuns(state)).toEqual(false);
    });
});

describe("getGameRuns", () => {
    it("should return expected structure", () => {
        const state = {
            gameRuns: gameRunsMock
        };

        const expectedGameRuns = [
            {
                videoUrl: "link1Uri",
                playerName: "player1Name",
                duration: 101
            },
            {
                videoUrl: "link2Uri",
                playerName: "2",
                duration: 103
            },
        ];

        expect(getGameRuns(state)).toEqual(expectedGameRuns);
    });

});

describe("getLastGameRun", () => {
    it("should return expected structure if a game run is found in gameRuns array", () => {
        const state = {
            gameRuns: gameRunsMock
        };

        const expectedGameRun = {
            videoUrl: "link1Uri",
            playerName: "player1Name",
            duration: 101
        };

        expect(getLastGameRun(state)).toEqual(expectedGameRun);
    });

    it("should return undefined when gameRuns is an empty array", () => {
        const state = {
            gameRuns: []
        };
    
        expect(getLastGameRun(state)).toEqual(undefined);
    });
});