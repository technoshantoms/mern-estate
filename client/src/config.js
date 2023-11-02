const CLIENT_ID = '0oad1lv4ai6kP3ZYt5d7';
const ISSUER = 'https://dev-62002082.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

// eslint-disable-next-line
export default {
  oidc: {
    clientId: '0oad1lv4ai6kP3ZYt5d7',
    issuer: 'https://dev-62002082.okta.com/oauth2/default',
    redirectUri: 'http://localhost:5173/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
