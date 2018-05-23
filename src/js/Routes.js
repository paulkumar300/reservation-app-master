import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './constants';

import ReservationList from './screens/Reservation/ReservationList';
import ReservationCreate from './screens/Reservation/ReservationCreate';
import ReservationDetails from './screens/Reservation/ReservationDetails';
import NotFound from './screens/NotFount/NotFound';

const RouteSwitch = () => (
    <Switch>
        <Route exact path={ROUTES.home} component={ReservationList} />
        <Route path={ROUTES.reservationCreate} component={ReservationCreate} />
        <Route path={ROUTES.reservationDetails+':id'} component={ReservationDetails} />
        <Route path='/*' component={NotFound} />
    </Switch>
);

export default RouteSwitch;
