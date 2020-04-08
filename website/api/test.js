export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe', host: req.headers.host, ENV: process.env.NODE_ENV }))
  }