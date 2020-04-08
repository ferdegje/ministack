import { initAuth0 } from '@auth0/nextjs-auth0';
import MiniStack from '../project.tfvars.json'

const protocol  = process.env.NODE_ENV=="development" ? "http":"https"
const prodHost  = MiniStack.project + "." + MiniStack.domain
const host      = process.env.NODE_ENV=="development" ? "localhost:3000":prodHost

export default initAuth0({
  domain: MiniStack.auth0.domain,
  clientId: MiniStack.auth0.client_id,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile',
  redirectUri: protocol+'://'+host+'/api/callback',
  postLogoutRedirectUri: protocol+'://'+host+'/',
  session: {
    cookieSecret: 'some-very-very-very-very-very-very-very-very-long-secret',
    cookieLifetime: 60 * 60 * 8,
    storeAccessToken: true,
    storeRefreshToken: true
  }
});