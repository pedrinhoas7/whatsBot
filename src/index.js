const qrcode = require('qrcode-terminal');
const lembrete = require('./models/lembrete')
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Conectado no bot whatsapp');
});

client.initialize();

client.on('message', message => {
	console.log(message.body);
});

client.on('message', message => {
	if(message.body === '/start') {
        console.log(message)
		client.sendMessage(message.from, `Bem vindo \u{1F60D}`);
        client.sendMessage(message.from, `O BOT foi programado para reconhecer um comando\n
        \u{1F4CC}Lembrete: /lembrete`);
	}
});

client.on('message', message => {
	if(message.body === '/lembrete') {
        console.log(message)
        client.sendMessage(message.from, `O BOT foi programado para reconhecer um comando\n
        \nfunções para lembrete \n
        \n/allLembrete
        \n/getLembreteId id
        \n/deleteLembreteId id
        \n/updateLembrete id, nome, descrição,hora
        \n/createLembrete nome, descrição,hora`);
	}
});

client.on('message',async message => {
	if(message.body === '/allLembretes') {
        lembretes = await lembrete.findAll();
        console.log(message, lembretes)
		client.sendMessage(message.from, `Bem vindo \u{1F60D}`);
        client.sendMessage(message.from, `O BOT foi programado para reconhecer um comando\n
        \u{1F4CC}Lembrete: /lembrete`);
	}
});

client.on('message',async message => {
	if(message.body.substring(0,12) === 'Bom dia amor') {
		client.sendMessage(message.from, `Bom Diaa meu amor`);

	}
});

/* client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
}); */