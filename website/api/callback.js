import fetch from 'node-fetch'
import Infrastructure from '../infrastructure.json'

const subdomain = (Infrastructure.project.value+"."+Infrastructure.domain.value).replace(/\./g,"-")
const redirect_uri_hostname = process.env.NODE_ENV=="development" ? "http://localhost:3000" : `https://${subdomain}`
const domain = `${subdomain}.auth.${Infrastructure.region.value}.amazoncognito.com`

export default (req, res) => {
    const code = req.query.code
    res.setHeader('Content-Type', 'application/json')
    const query = {
        "grant_type": "authorization_code",
        "client_id": Infrastructure.client_id.value,
        "code": code,
        "redirect_uri": `${redirect_uri_hostname}/api/callback`
    }
    const body = Object.keys(query).map(key => key + '=' + query[key]).join('&')
    console.log(body)
    fetch(`https://${domain}/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    }).then(data => {
        if (data.status != 200) {
            res.statusCode = data.status
        }
        return data.json()
    }).then(jsonLoad => {
        res.statusCode = 302
        res.setHeader('Set-Cookie', "token="+JSON.stringify(jsonLoad)+"; Path=/")
        res.setHeader("Location", "/")
        res.end(JSON.stringify(jsonLoad))
    })
  }