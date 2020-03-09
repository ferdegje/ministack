import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import Infrastructure from "./infrastructure.json";
import AWSAppSyncClient from 'aws-appsync'
// import { Rehydrated } from 'aws-appsync-react'

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const ApolloAuthDetails = {
    region: Infrastructure.region.value,
    auth: {
        type: Infrastructure.aws_appsync_graphql_api_authentication_type.value,
        apiKey: Infrastructure.aws_appsync_graphql_api_api_key.value,
    },
    url: Infrastructure.aws_appsync_graphql_api_uris.value.GRAPHQL,
  };
console.log(ApolloAuthDetails)
const client = new AWSAppSyncClient(ApolloAuthDetails);
  
const Appollo = () => (
    <ApolloProvider client={client}>
        {/* <Rehydrated> */}
            <App />
        {/* </Rehydrated> */}
    </ApolloProvider>
);

ReactDOM.render(
<Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Appollo />
  </Auth0Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// client
//   .query({
//     query: gql`
//       query listMinistackArticles {
//         listMinistackArticles {
//           items {
//             id,
//             title      
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));