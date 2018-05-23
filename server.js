'use strict';

const Hapi = require('hapi');
const Lout = require('lout');
const Inert = require('inert');
const Vision = require('vision');
const db = require('./database').db;

const port = process.env.SERVER_PORT || 4000;
const env = process.env.NODE_ENV || 'production';
if (env !== 'production') {
    const proxy = {'/rest/*': 'http://localhost:4000',};
}
const server = new Hapi.Server();
server.connection({
	port: port
});

const loutRegister = {
	register: Lout,
	options: { endpoint: '/docs' }
};

const routes = require('./routes');

server.register([Inert, Vision, loutRegister], (err) => {
	if (err) {
		console.error('Failed loading plugins');
		process.exit(1);
	}

	server.route(routes);

	server.route({
		method: 'GET',
		path: '/',
		handler(request, reply) {
			reply.file(__dirname+'/build/index.html');
		}
	});
    server.route({
        method: 'GET',
        path: '/static/js/{file*}',
        handler: {
            directory: {
                path: 'build/static/js'
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/static/css/{file*}',
        handler: {
            directory: {
                path: 'build/static/css'
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/static/media/{file*}',
        handler: {
            directory: {
                path: 'build/static/media'
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: {
                path: 'build'
            }
        }
    });


	server.start(err => {
		if (err) {
			throw err;
		}
		console.log(`Server running at: ${server.info.uri}`);
	});
});
	exports.server = server;
