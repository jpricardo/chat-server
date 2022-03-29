'use strict';
(() => {
	const config = async (server) => {
		const socketIo = require('socket.io');
		const io = new socketIo.Server(server);

		let users: { userId: string; name: string }[] = [];

		const findUser = (id: string) => {
			return users.find((user) => user.userId === id);
		};

		io.on('connection', (socket) => {
			socket.on('setId', (data) => {
				console.log(`[WEBSOCKET] Novo usuário: ${data.name}`);
				socket.broadcast.emit('joined', {
					data: `Usuário ${data.name} se juntou!`,
				});
				users.push(data);
			});

			socket.on('chat message', (msg) => {
				const user = findUser(socket.id);
				if (!user) {
					console.log('[WEBSOCKET] USUÁRIO NÃO ENCONTRADO!');
					return;
				}
				console.log(`[WEBSOCKET] ${user.name} diz: ${msg.data}`);
				socket.broadcast.emit('chat message', {
					name: user.name,
					data: msg.data,
				});
			});

			socket.on('disconnect', () => {
				const user = findUser(socket.id);
				console.log(`[WEBSOCKET] Usuário ${user.name} desconectado!`);
				const msg = { data: `${user.name} deixou a sala...` };
				socket.broadcast.emit('left', msg);
			});
		});
	};
	module.exports = { config };
})();
