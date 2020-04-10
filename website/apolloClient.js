import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import MiniStack from './project.tfvars.json'
import React from 'react';

export default function createApolloClient(initialState, ctx, access_token) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: "https://graphql-"+MiniStack.project+"."+MiniStack.domain+"/graphql", // Server URL (must be absolute)
      headers: {
        "authorization": "Bearer "+access_token,
        "Cache-Control": "no-cache"
      },
      // useGETForQueries: true
      // fetch,
      // credentials: "include"
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}
