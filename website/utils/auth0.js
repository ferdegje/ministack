import { initAuth0 } from '@auth0/nextjs-auth0';
import MiniStack from '../project.tfvars.json'

export default initAuth0({
  domain: MiniStack.auth0.domain,
  clientId: MiniStack.auth0.client_id,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile',
  redirectUri: 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: 'some-very-very-very-very-very-very-very-very-long-secret',
    cookieLifetime: 60 * 60 * 8,
    storeAccessToken: true,
    storeRefreshToken: true
  }
});