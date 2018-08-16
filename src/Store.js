import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import {Navigator as MainNavigator} from './MainNavigator';
import { createNetworkInterface } from 'react-apollo';

export default ({client})=>{
    return createStore(
        combineReducers({
            MainNavigator:(state,action)=>{
                return MainNavigator.router.getStateForAction(action,state);
            },
            apollo:client.reducer()
        }),
        client.initialState,
        compose(
            applyMiddleware(client.middleware()),
        )
    );
}