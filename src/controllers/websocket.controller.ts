'use strict';
(() => {
	const config = async (server) => {
		const socketIo = require('socket.io');
		const io = new socketIo.Server(server);
		io.on('connection', (socket) => {
			console.log(`[WEBSOCKET] Usuário se conectou!`);
			socket.broadcast.emit('joined', 'Usuário se juntou!');

			socket.on('disconnect', () => {
				console.log(`[WEBSOCKET] Usuário desconectado!`);
				socket.broadcast.emit('left', 'Usuário deixou a sala...');
			});

			socket.on('chat message', (msg) => {
				console.log(`[WEBSOCKET] Nova mensagem => ${msg}`);
				socket.broadcast.emit('chat message', msg);
			});
		});
	};
	module.exports = { config };
})();
