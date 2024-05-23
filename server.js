const utils = require('./utils.js');
const http = require('http');
const port = process.env.PORT || '8081';
const host = process.env.HOST || 'localhost';



const server = http.createServer(async (req, res) => {
    if (res.url == '/favicon.ico') {
        res.end()
        return
    }
    let uniqueQuote = await utils.getUniqueQuote()
    const hmtlPage = utils.getFile(utils.htmlPagePath).replace('{{QUOTES}}', `<p>${uniqueQuote}</p>`)
    res.writeHead(200, {
        'Content-Type': 'text-html'
    })

    if (uniqueQuote) {
        res.end(hmtlPage);
        // res.end(`<html><body><p>${uniqueQuote}</p></body></html>`)
    } else {
        res.end(`<html><body><p>Chuck Norris' snot has the same properties as C-4 explosive.","Chuck Norris ejaculates pure liquid mercury</p></body></html>`)
    }

})


server.listen(port, host, () => {
    console.log('server running on port ' + port)
})