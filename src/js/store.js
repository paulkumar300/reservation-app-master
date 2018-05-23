import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from './reducers/root';

/**
 * Create the store
 */
export default function configureStore(initialState = {}) {
    // Create the store with middlewares
    const middlewares = [
        thunkMiddleware
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const store = createStore(
        appReducer,
        initialState,
        composeEnhancers(...enhancers)
    );

    return store;
}
