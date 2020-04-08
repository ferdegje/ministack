import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import MiniStack from './project.tfvars.json'

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: "https://graphql-"+MiniStack.project+"."+MiniStack.domain+"/graphql", // Server URL (must be absolute)
      headers: {
        "x-api-key": "da2-xzmzwr4cizapnk2hibi3x56lle",
        "Cache-Control": "no-cache"
      },
      // useGETForQueries: true
      // fetch,
      // credentials: "include"
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}
