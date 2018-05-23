'use strict';
const moment = require('moment');
const Joi = require('joi');
const Reservation = require('./models/reservation');

module.exports = [
	{
		method: 'GET',
		path: '/api/reservations',
		config: {
			validate: {
				query: {
					hotelname: Joi.string().optional(),
					departuredate: Joi.string().optional(),
					arrivaldate: Joi.string().optional()
				}
			},
			handler(request, reply) {
				const query = request.query;
				let filters = {};
				query.hotelname ? filters['hotelName'] = query.hotelname : '';
				query.departuredate ? (filters['departureDate'] = {
					'$lte': moment(query.departuredate).add(1, 'day'),
					'$gte': moment(query.departuredate)
				}) : {};
				query.arrivaldate ? (filters['arrivalDate'] = {
					'$lte': moment(query.arrivaldate).add(1, 'day'),
					'$gte': moment(query.arrivaldate)
				}) : {};
				Reservation.find(filters, '', function (error, reservations) {
					if (error) {
						console.error(error);
					}

					reply(reservations);
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/api/reservation/{id}',
		config: {
			validate: {
				params: {
					id: Joi.string().description('5ae3a00d13ba66428829df92'),
				}
			},
			handler(request, reply) {
				Reservation.find({ _id: request.params.id }, '', function (error, reservations) {
					if (error) {
						console.error(error);
					}

					reply(reservations);
				});
			}
		}
	},
	{
		method: 'POST',
		path: '/api/reservations',
		config: {
			validate: {
				payload: {
					name: Joi.string(),
					hotelName: Joi.string(),
					departureDate: Joi.string(),
					arrivalDate: Joi.string()
				}
			},
			handler(request, reply) {
				const newReservation = new Reservation({
					name: request.payload.name,
					hotelName: request.payload.hotelName,
					arrivalDate: new Date(Date.parse(request.payload.arrivalDate)),
					departureDate: new Date(Date.parse(request.payload.departureDate))
				});
				newReservation.save((error, reservation) => {
					if (error) {
						console.error(error);
					}

					reply(reservation.id);
				});
			}
		}
	}
];
