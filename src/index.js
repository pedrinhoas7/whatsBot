const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// Crie uma nova instância do cliente
const client = new Client({
    puppeteer: {
        headless: false,
        args: ['--no-sandbox'],
        timeout: 600000 // Aumenta o timeout para 60 segundos
    }
});


// Gera o QR Code para autenticação
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Exibe uma mensagem quando o cliente estiver autenticado
client.on('ready', () => {
    console.log('Cliente está pronto!');
});

// Responde a mensagens recebidas
client.on('message', message => {
    console.log(`Mensagem recebida: ${message.body}`);
    console.log(`Mensagem recebida: ${message}`);
    if (message.body.toLowerCase().includes('consulta')) {
        message.reply('Para agendar uma consulta, por favor, ligue para (XX) XXXXX-XXXX ou acesse nosso site.');
    } else if (message.body.toLowerCase().includes('horário')) {
        message.reply('Nossos horários de atendimento são de segunda a sexta, das 9h às 18h.');
    } else if (message.body.toLowerCase().includes('falar com')) {
        message.reply('Em breve, um fonoaudiólogo entrará em contato com você.');
    } else if (message.body.toLowerCase().includes('olá')){
        message.reply('Olá! Como posso ajudá-lo? Você pode perguntar sobre consulta, horário de atendimento ou pedir para falar com um fonoaudiólogo.');
    }
    
});

// Inicia o cliente
client.initialize();
