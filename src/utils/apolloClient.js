import ApolloClient from 'apollo-boost';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://wsl:5000/graphql',
  });
};

export default createApolloClient;