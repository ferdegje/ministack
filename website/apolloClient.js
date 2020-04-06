import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: "https://graphql-ministack.nokdo.com/graphql", // Server URL (must be absolute)
      headers: {
        "x-api-key": "da2-vfxzgqrp6fhpxkod2asjlctvee",
        "Cache-Control": "no-cache"
      },
      // useGETForQueries: true
      // fetch,
      // credentials: "include"
    }),
    cache: new InMemoryCache().restore(initialState),
  })
  console.log("tto")
}
