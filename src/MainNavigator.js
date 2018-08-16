import {
  StackNavigator,
  addNavigationHelpers
} from 'react-navigation';
  import React from 'react';
  import { BackHandler } from 'react-native';
  import { connect } from 'react-redux';
  import HomeScreen from './HomeScreen';
  import hello from './hello';
  
  const Navigator = StackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: hello },
  },{
    headerMode:'none'
  });

  const isRootScreen=(navigator)=> {
    if (navigator.index == null) {
      return true;
    }
  
    if (navigator.index > 0) {
      return false;
    }
  
    return !navigator.routes || !navigator.routes.find(route => !isRootScreen(route));
  };
  
class MainNavigator extends React.Component{
  __shouldCloseApp(navigations){
    return navigations.every(nav=>(isRootScreen(nav)));
  }

  componentDidMount(){
    BackHandler.addEventListener('backPress',()=>{
      const { dispatch, mainNavigator } = this.props;
      if (this.__shouldCloseApp([mainNavigator]))
        return false;
      dispatch({ type: 'Navigation/BACK' })
      return true;
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
  }
  render(){
    let {dispatch,mainNavigator} = this.props;
    return (<Navigator navigation = {
        addNavigationHelpers({
          dispatch,
          state:mainNavigator
        })
      }/>);
  }
  
}

export default connect(
  state=>({mainNavigator:state.MainNavigator})
)(MainNavigator);

export {Navigator};