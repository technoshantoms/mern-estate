import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Routes, useNavigate } from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import Header from './components/Header';
import Roues from './components/Routes';
import { Security } from '@okta/okta-react';
import config from './config';

const oktaAuth = new OktaAuth(config.oidc);

const  App= () => {

  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth,  originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <div>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Header />
          <main>
            <Roues/>
          </main>
      </Security>
    </div>
  );
};
export default App;
