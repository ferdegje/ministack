import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  let response = await fetch('https://infrastructure.ministack.nokdo.com/infrastructure.json');
  let Infrastructure = await response.json();

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: Infrastructure.aws_appsync_graphql_api_uris.value.GRAPHQL, // Server URL (must be absolute)
      headers: {
        "x-api-key": Infrastructure.aws_appsync_graphql_api_api_key.value
      },
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}
