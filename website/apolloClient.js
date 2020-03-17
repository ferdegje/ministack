import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
  // return new ApolloClient({
  //   ssrMode: Boolean(ctx),
  //   link: new HttpLink({
  //     uri: "https://tptyikdca5hqbj64z5heom46lm.appsync-api.eu-west-2.amazonaws.com/graphql", // Server URL (must be absolute)
  //     headers: {
  //       "x-api-key": "da2-fpivfg5tbnhnlkp2nmw3mkkqee"
  //     },
  //     fetch,
  //   }),
  //   cache: new InMemoryCache().restore(initialState),
  // })
  console.log("tto")
  return fetch('https://infrastructure.ministack.nokdo.com/infrastructure.json')
    .then(response => response.json())
    .then(Infrastructure => {
      console.log("Output infra")
      console.log(Infrastructure)
      // return new ApolloClient({
      //   ssrMode: Boolean(ctx),
      //   link: new HttpLink({
      //     uri: Infrastructure.aws_appsync_graphql_api_uris.value.GRAPHQL, // Server URL (must be absolute)
      //     headers: {
      //       "x-api-key": Infrastructure.aws_appsync_graphql_api_api_key.value
      //     },
      //     fetch,
      //   }),
      //   cache: new InMemoryCache().restore(initialState),
      // })
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}
