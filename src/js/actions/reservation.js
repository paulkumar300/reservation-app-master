export const UPDATE_PROPERTY = 'RESERVATION/UPDATE_PROPERTY';

function formatData (item) {
    return {
        id: item._id,
        hotelName: item.hotelName,
        name: item.name,
        checkInDate: item.arrivalDate,
        checkOutDate: item.departureDate
    }
}

export function formatReservationList(list)  {
    return (dispatch) => {
        const newList = list.map(item => {
            return formatData(item);
        });
        dispatch(updateProperty({filterList: newList}));
    }
}

export function resetReservations() {
    return (dispatch) => {
        dispatch(updateProperty({filterList: {}, details:{}}));
    }
}

export function updateDetails(item) {
    return (dispatch) => {
        dispatch(updateProperty({details: formatData(item)}));
    }
}

export function updateProperty(payload) {
    return {
        type: UPDATE_PROPERTY,
        payload
    };
}
