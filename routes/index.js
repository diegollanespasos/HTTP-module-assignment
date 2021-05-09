const fs = require('fs');
const { getMyNumber, postMyNumber, putMyNumber, getMyNumberMultiplied } = require('../controllers/index');

const notFound = (req, res) => {
    res.statusCode = 404;
    return res.end(JSON.stringify({
        message: 'Resource not found'
    }))
}

const reset = (req, res) => {
    if(req.method === 'DELETE'){
        const numberJSON = fs.readFileSync('./public/data.txt', 'utf-8');
        const myNumber = JSON.parse(numberJSON).myNumber;

        if(myNumber !== null && req.url === '/reset'){
            fs.writeFileSync('./public/data.txt', JSON.stringify({
                myNumber : null
            }));

            res.statusCode = 200;
            return res.end(JSON.stringify({
                message: 'Successfully deleted'
            }));
        }
        return notFound(req, res);
    }

    res.statusCode = 400;
    return res.end(JSON.stringify({
        message: 'Bad Request'
    }))
}

const myNumber = (req, res) => {
    switch(req.method) {
        case 'GET':
            const isNumberRegex = /^\d+$/;
            const uriParam = req.url.split('/')[2];

            if(req.url === '/myNumber') return getMyNumber(req, res);

            if(isNumberRegex.test(uriParam)) getMyNumberMultiplied(req, res, uriParam);

            else notFound(req, res);   
        break;

        case 'POST':
            if(req.url === '/myNumber') postMyNumber(req, res);

            else notFound(req, res);
        break;

        case 'PUT':
            if(req.url === '/myNumber') putMyNumber(req, res);

            else notFound(req, res);
        break;

        default: 
            break;
    }
}

module.exports = {
    myNumber, 
    notFound, 
    reset
}