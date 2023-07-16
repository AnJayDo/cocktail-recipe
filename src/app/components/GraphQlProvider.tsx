'use client'; 

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? "http://localhost:6969/graphql" : "https://cocktail-graphql.dovanminhan.com/graphql",
  headers: {
    "Cocktail-Custom-Header": "*",
  },
  cache: new InMemoryCache()
});

interface IGraphQlProviderProps {
    children: React.ReactNode; 
}

const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({
    children
}) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>

    )
}

export default GraphQlProvider; 