const http = require('http');
const handler = require('./routes/index');

const PORT = 9000;

const router = (domain) => {
    const routes = {
        myNumber: handler.myNumber,
        reset: handler.reset
    }

    if(!routes[domain]){
        return handler.notFound;
    }
    return routes[domain]
}

const server = http.createServer((req, res) => {
    const [, domain] = req.url.split('/');

    res.setHeader('Content-Type', 'application/json');
    const route = router(domain);
    return route(req, res);
})

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));