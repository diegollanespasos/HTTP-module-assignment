const fs = require('fs');

const getMyNumber = (req, res) => {
    const numberJSON = fs.readFileSync('./public/data.txt', 'utf-8');
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber !== null){
        res.statusCode = 200;
        return res.end(numberJSON);
    } else {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: 'There is no value stored'
        }));
    }
}

const getMyNumberMultiplied = (req, res, uriParam) => {
    const numberJSON = fs.readFileSync('./public/data.txt', 'utf-8');
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber !== null){
        res.statusCode = 200;
        return res.end(JSON.stringify({
            multipliedNumber: myNumber * uriParam
        }));
    } else {
        res.statusCode = 400;
        return res.end(JSON.stringify({
            message: 'There is no current value for myNumber, multiplier cannot be applied'
        }));
    }
}

const postMyNumber = (req, res) => {
    const numberJSON = fs.readFileSync('./public/data.txt', 'utf-8');
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber === null){
        const body = [];

        req.on('data', (chunk) => body.push(chunk));

        req.on('end', () => {
          const buffer = Buffer.concat(body).toString();
          const bodyValue = JSON.parse(buffer).myNumber;

            if(typeof bodyValue !== 'number'){
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    message: 'Not allowed a non-numeric value'
                }));
            }

          fs.writeFileSync('./public/data.txt', buffer, { encoding: 'utf-8'} );
          res.statusCode = 201;
          return res.end(JSON.stringify({
              message: 'Number successfully created'
          }));
        });
    } else {
        res.statusCode = 400;
        return res.end(JSON.stringify({
            message: 'A number already exists, use PUT Method'
        }));
    }
}


const putMyNumber = (req, res) => {
    const numberJSON = fs.readFileSync('./public/data.txt', 'utf-8');
    const myNumber = JSON.parse(numberJSON).myNumber;

    if(myNumber !== null){
        const body = [];

        req.on('data', (chunk) => body.push(chunk));

        req.on('end', () => {
          const buffer = Buffer.concat(body).toString();
          const bodyValue = JSON.parse(buffer).myNumber;

            if(typeof bodyValue !== 'number'){
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    message: 'Not allowed a non-numeric value'
                }));
            }

          fs.writeFileSync('./public/data.txt', buffer, { encoding: 'utf-8'} );
          res.statusCode = 200;
          return res.end(JSON.stringify({
              message: 'Number successfully updated'
          }));
        });
    } else {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: 'There is no value stored, use POST Method'
        }));
    }
}

module.exports = {
    getMyNumber,
    getMyNumberMultiplied,
    postMyNumber,
    putMyNumber
}