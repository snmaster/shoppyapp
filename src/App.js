import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient ,{ createNetworkInterface, addTypename } from 'apollo-client';
import MainNavigator from './MainNavigator';
import createStore from './Store';

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.100.8:3232/graphql', 
  opts:{
    credentials: 'same-origin'
  },
  transportBatching: true
});

const apolloClient = new ApolloClient(Object.assign({}, {
    queryTransformer: addTypename,
    dataIdfromObject: (result) => {
      if (result.id && result.__typename) {
        return result.__typename + result.id;
      }
      return null;
    }
},{
  networkInterface:networkInterface,
  ssrForceFetchDelay: 100,
}));

const store = createStore({client:apolloClient});

const App = () =>{
  return(
    <ApolloProvider store={store} client={apolloClient}>
        <MainNavigator/>
    </ApolloProvider>
  )
};

StatusBar.setBarStyle('light-content', true);

AppRegistry.registerComponent('shoppylife', () => App);