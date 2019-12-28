import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.method === 'POST' && !req.body) {
        res.status(400).send('Content-Type');
        return;
    }
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // TODO
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).send();
        return;
    }
    next();
});

app.use(routes);

const listener = app.listen(port, () => console.log(`Now listening on port ${port}`));
if (process.env.NODE_ENV !== 'production') {
    // We may have multiple instances of the application running when not in production.
    // For example, an application & a superTest suite running at the same time.
    // However, we do not want to accidentally run on the wrong port in production.
    listener.on('error', (e) => {
        if (e.errno === 'EADDRINUSE') {
            console.warn(`Port ${port} already in use. Falling back to random port`);
            const listener = app.listen(() => {
                console.log(`Now listening on port ${listener.address().port}`);
            });
        }
        else {
            throw e;
        }
    });
}

process
    .on('unhandledRejection', (exception, promise) => {
        console.log('Unhandled rejection at Promise');
        console.log(exception.toString());
        console.log(exception.stack);
        console.log(promise);
    })
    .on('uncaughtException', exception => {
        console.log('Unhandled exception thrown');
        console.log(exception.toString());
        console.log(exception.stack);
    });

export default app;
