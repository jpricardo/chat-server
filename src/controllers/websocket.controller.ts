'use strict';
(() => {
	const config = async (server) => {
		const socketIo = require('socket.io');
		const io = new socketIo.Server(server);

		const webSocket = {
			log: (d) => {
				console.log(`[WEBSOCKET] ${new Date().toLocaleString()} - ${d}`);
			},
		};

		let users: { userId: string; name: string }[] = [];

		const atualizarOnline = () => {
			io.emit('online', { data: users.length });
		};

		const findUser = (id: string) => {
			return users.find((user) => user.userId === id);
		};

		io.on('connection', (socket) => {
			socket.on('setId', (data) => {
				webSocket.log(`Novo usuário: ${data.name}`);
				socket.broadcast.emit('joined', {
					data: `Usuário ${data.name} se juntou!`,
				});
				users.push(data);
				atualizarOnline();
			});

			socket.on('chat message', (msg) => {
				const user = findUser(socket.id);
				if (!user) {
					webSocket.log(`USUÁRIO NÃO ENCONTRADO!`);
					return;
				}
				webSocket.log(`${user.name} diz: ${msg.data}`);
				socket.broadcast.emit('chat message', {
					name: user.name,
					data: msg.data,
					type: msg.type,
				});
			});

			socket.on('disconnect', () => {
				const user = findUser(socket.id);
				if (!user) {
					webSocket.log('Usuário não encontrado');
					return;
				} else {
					webSocket.log(`Usuário ${user.name} desconectado!`);
					const msg = { data: `${user.name} deixou a sala...` };
					users.splice(users.indexOf(user), 1);
					socket.broadcast.emit('left', msg);
					atualizarOnline();
				}
			});
		});
	};
	module.exports = { config };
})();
