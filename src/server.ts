'use strict';
module.exports = () => {
	const express = require('express');
	const http = require('http');
	const path = require('path');

	const handlebars = require('express-handlebars');
	const favicon = require('serve-favicon');
	// const cookieParser = require('cookie-parser');

	const app = express();
	const server = http.createServer(app);

	const config = require('./config/server.config');
	const middleware = require('./lib/middleware.lib');
	require('./controllers/websocket.controller').config(server);

	const hbs = handlebars.create({
		partialsDir: path.join(__dirname, './templates', '/partials'),
		layoutsDir: path.join(__dirname, './templates', '/layouts'),
		defaultLayout: 'main',
	});
	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
	app.set('trust proxy', 1);
	app.set('views', __dirname + '/templates');

	app.use(favicon(path.join(__dirname, './public/images', 'chat.png')));
	// app.use(cookieParser());
	// app.use(config.session);

	app.use(middleware.timeLog);

	app.get('/', (req: any, res: any) => {
		res.render('index');
	});

	app.use('/public', express.static(path.join(__dirname, './public')));

	server.listen(config.port, () => {
		console.log(`[SERVER] Servidor ouvindo na porta ${config.port}`);
	});
};
