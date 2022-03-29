let username: string;

const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input: HTMLInputElement = document.getElementById('input');
const online = document.getElementById('online');

const createEntry = (
	container: HTMLElement,
	content: { name?: string; data: string },
	decorator = false,
	className: string = ''
) => {
	if (typeof content === 'string') {
		content = JSON.parse(content);
	}
	const item = document.createElement('li');
	let text = '';

	if (decorator) {
		const prefix = `${content.name} [${new Date().toLocaleTimeString()}] >>`;
		text = `${prefix} ${content.data}`;
	} else {
		text = content.data;
	}

	if (className) {
		item.classList.add(className);
	}

	item.textContent = text;
	container.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
};

window.onload = () => {
	while (!username) {
		username = prompt('Seu nome:');
	}

	createEntry(
		messages,
		{ data: `Bem vind@ à sala, ${username}!` },
		false,
		'info'
	);

	input.focus();
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value) {
		const msg = { name: username, data: input.value };
		socket.emit('chat message', msg);
		createEntry(messages, msg, true);
		input.value = '';
		input.focus();
	}
});

socket.on('connect', () => {
	const credentials = { name: username, userId: socket.id };
	socket.emit('setId', credentials);
});

socket.on('online', (val) => {
	online.textContent = ` - ${val.data} Online`;
});

socket.on('chat message', (msg) => {
	const item = document.createElement('li');
	createEntry(messages, msg, true, 'dark');
});

socket.on('joined', (msg) => {
	const item = document.createElement('li');
	createEntry(messages, msg, false, 'info');
});

socket.on('left', (msg) => {
	createEntry(messages, msg, false, 'info');
});
