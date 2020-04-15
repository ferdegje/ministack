import Infrastructure from "../infrastructure.json"

const subdomain = (Infrastructure.project.value+"."+Infrastructure.domain.value).replace(/\./g,"-")
const redirect_uri_hostname = process.env.NODE_ENV=="development" ? "http://localhost:3000" : `https://${Infrastructure.project.value}.${Infrastructure.domain.value}`
const domain = `${subdomain}.auth.${Infrastructure.region.value}.amazoncognito.com`
const queryParameters = {
    'client_id': Infrastructure.client_id.value,
    'response_type': 'code',
    'scope': 'email+openid+phone+profile',
    'redirect_uri': `${redirect_uri_hostname}/api/callback`
}

export default (req, res) => {
    res.statusCode = 302
    const url = `https://${domain}/login?`+Object.keys(queryParameters).map(key => key + '=' + queryParameters[key]).join('&')
    res.setHeader('Set-Cookie', "token=old; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT")
    res.setHeader("Location", url)
    res.end("Login")
}