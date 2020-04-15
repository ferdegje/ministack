export default (req, res) => {
    res.statusCode = 302
    res.setHeader('Set-Cookie', "token=old; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT")
    res.setHeader("Location", "/")
    res.end("Logged out")
  }