import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
  let uri
  uri = "https://7w4lgaz3p5gctlehfdrvog5kqe.appsync-api.eu-west-2.amazonaws.com/graphql"
  uri = "https://graphql-ministack.nokdo.com/graphql"
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: uri, // Server URL (must be absolute)
      headers: {
        "x-api-key": "da2-a2qs4xbs25h5rl3zo4dp57b76u",
        "Origin": "localhost:3000"
      },
      fetch,
      credentials: "include"
    }),
    cache: new InMemoryCache().restore(initialState),
  })
  console.log("tto")
}
