export const home = {
    path: "/",
    getLink: () => "/"
}

export const gameDetail = {
    path: "/games/:id",
    getLink: id =>  "/games/:id".replace(':id', id)
}