import auth0 from '../utils/auth0';

export default async function token(req, res) {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    res.status(200).end(accessToken)
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}