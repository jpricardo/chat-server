'use strict';
(() => {
	require('dotenv').config();
	const sessions = require('express-session');

	const port = process.env.PORT || 3000;
	const sessionKey = process.env.SESSION_KEY || 'key_padrão';
	const session = sessions({
		secret: sessionKey,
		saveUninitialized: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
		},
		resave: false,
	});

	module.exports = {
		port,
		session,
	};
})();
