import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//COMBINING THE REDUCERS 
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );

    return store;
}

combineReducers({
    campsites: Campsites,
    comments: Comments,
    partners: Partners,
    promotions: Promotions
}),
applyMiddleware(thunk, logger)