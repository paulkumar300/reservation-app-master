import { combineReducers } from 'redux';

import reservation from './reservation';

export const rootReducer = combineReducers({
    reservation,
});

export const appReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }

    return rootReducer(state, action);
};
