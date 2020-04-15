// lib/withApollo.js
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Infrastructure from "../infrastructure.json";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';

let token = Cookies.get('token')

export default withApollo(
  ({ initialState }) => {
    if (token == undefined) {
        return new ApolloClient({
            uri: Infrastructure.aws_appsync_graphql_api.value.GRAPHQL,
            cache: new InMemoryCache().restore(initialState || {})
          });
    }
    let access_token = JSON.parse(token).access_token
    
    return new ApolloClient({
      uri: Infrastructure.aws_appsync_graphql_api.value.GRAPHQL,
      headers: {
          "authorization": access_token
      },
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);