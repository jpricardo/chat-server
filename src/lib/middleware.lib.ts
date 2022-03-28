'use strict';
(() => {
	const timeLog = async function (req: any, res: any, next: any) {
		const data: Date = new Date();
		console.log(
			`[SERVER] ` +
				`${data.toLocaleString()} ` +
				`${req.ip} - ` +
				`${req.method} ` +
				`${req.url} ` +
				`${res.statusCode}`
		);
		next();
	};

	module.exports = {
		timeLog,
	};
})();
