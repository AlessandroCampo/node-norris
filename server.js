const http = require('http');
const port = process.env.PORT || '8081'
const host = process.env.HOST || 'localhost'
const chuckApiEndpoint = 'https://api.chucknorris.io/jokes/random'


const server = http.createServer(async (req, res) => {
    let quote
    try {
        const response = await fetch(chuckApiEndpoint)
        const data = await response.json()
        quote = data.value
    } catch (err) {
        console.error(err)
    }
    res.writeHead(200, {
        'Content-Type': 'text-html'
    })
    res.end(quote)
})


server.listen(port, host, () => {
    console.log('server running on port ' + port)
})