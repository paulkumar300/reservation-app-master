'use strict';

const Mongoose = require('mongoose');

// load database
Mongoose.connect('mongodb://localhost/reservation/');
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('Connection with database succeeded.');
});

exports.db = db;
