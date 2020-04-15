

export default (req, res) => {
    res.setHeader('Set-Cookie', "session=youpa; Path=/")
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe' }))
}