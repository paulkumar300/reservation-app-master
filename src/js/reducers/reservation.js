import {UPDATE_PROPERTY} from '../actions/reservation';

const initialState = {
    errors: [],
    loading: false,
    filterList:{},
    hotelName: null,
    checkInDate: null,
    checkOutDate: null,
    details:{},
    createHotelName: null,
    createHotelNameError: null,
    createName: null,
    createNameError: null,
    createCheckInDate: null,
    createCheckInDateError: null,
    createCheckOutDate: null,
    createCheckOutDateError: null,
};
const handlers = {
    [UPDATE_PROPERTY]: (state, action) => action.payload,
};

function createReducer(initialState, handlers) {
    return (state = initialState, action = {}) => {
        const handler = handlers[action.type];
        if (!handler) return state;
        const newState = handler(state, action);
        if (newState === false) return state;
        return { ...state, ...newState };
    };
}

export default createReducer(initialState, handlers);
