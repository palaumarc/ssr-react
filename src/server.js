import express from "express";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore from "./store";

const app = express();

app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

app.get('/favicon.ico', (req, res) => res.status(204));

routes.forEach(route => {

    const { component, path } = route;

    app.get(path, ( req, res ) => {

        const context = {};
        const store = createStore();

         //Check if route component needs to fetch data
         const dataFetchs = component.serverFetch ? store.dispatch(component.serverFetch(req.params)) : Promise.resolve();

         //Wait until all data fetchs are finished
         dataFetchs.then(() => {
             const jsx = (
                 <ReduxProvider store={ store }>
                     <StaticRouter context={ context } location={ req.url }>
                         <Layout />
                     </StaticRouter>
                 </ReduxProvider>
             );
 
             const reactDom = renderToString(jsx);
             const reduxState = store.getState();
 
             res.send(htmlTemplate(reactDom, reduxState));
         });

    });

})

app.listen( 2048 );

const htmlTemplate = (reactDom, reduxState) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>

        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
            <script src="/app.bundle.js"></script>
        </body>
        </html>
    `;
}
