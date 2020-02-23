import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import 'semantic-ui-css/semantic.min.css'
import App from './App'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
})

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: { watchQuery: {
    fetchPolicy: 'no-cache'
  } }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

