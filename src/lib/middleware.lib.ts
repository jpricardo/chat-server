'use strict';
(() => {
	const timeLog = async function (req: any, res: any, next: any) {
		const data: Date = new Date();
		console.log(
			`[SERVER]` +
				`${data.toLocaleString()} ` +
				`${req.ip} - ` +
				`${req.method} ` +
				`${req.url} ` +
				`${res.statusCode}`
		);
		next();
	};

	const connLog = async function (socket) {
		console.log(`[WEBSOCKET] Usuário se conectou!`);

		socket.on('disconnect', () => {
			console.log(`[WEBSOCKET] Usuário desconectado!`);
		});

		socket.on('chat message', (msg) => {
			console.log(`[WEBSOCKET] Nova mensagem => ${msg}`);
		});
	};

	module.exports = {
		timeLog,
		connLog,
	};
})();
