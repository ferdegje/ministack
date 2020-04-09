import auth0 from '../utils/auth0';
import Ministack from '../project.tfvars.json'
const fetch = require("node-fetch");

export default async function token(req, res) {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    console.log(tokenCache)
    const { accessToken } = await tokenCache.getAccessToken();
    const oauthToken = await fetch("https://"+Ministack.auth0.domain+"/oauth/token", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        "client_id": Ministack.auth0.client_id,
        "client_secret": process.env.AUTH0_CLIENT_SECRET,
        "audience": "https://"+Ministack.project+"."+Ministack.domain,
        "grant_type": "client_credentials"
      })
    })
    .then((resp) => resp.json())
    .then(data => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).end(JSON.stringify(data))
    })
    
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}