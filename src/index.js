const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode');
const { Client } = require('whatsapp-web.js');
const express = require('express');

const app = express();
let qrCodeData = null;

// Create a new client instance
const client = new Client({
    puppeteer: {
        headless: false,
        args: ['--no-sandbox'],
        timeout: 600000 // Increase the timeout to 60 seconds
    }
});

// Generate the QR code for authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    qrCodeData = qr; // Save QR code data for later
});

// Display a message when the client is authenticated
client.on('ready', () => {
    console.log('Client is ready!');
});

// Respond to received messages
client.on('message', message => {
    console.log(`Message received: ${message.body}`);
    if (message.body.toLowerCase().includes('consulta')) {
        message.reply('To schedule a consultation, please call (XX) XXXXX-XXXX or visit our website.');
    } else if (message.body.toLowerCase().includes('horário')) {
        message.reply('Our office hours are Monday to Friday, from 9 AM to 6 PM.');
    } else if (message.body.toLowerCase().includes('falar com')) {
        message.reply('A speech therapist will contact you soon.');
    } else if (message.body.toLowerCase().includes('olá')) {
        message.reply('Hello! How can I assist you? You can ask about consultations, business hours, or request to speak with a speech therapist.');
    }
});

// Endpoint to get the QR code
app.get('/', async (req, res) => {
    if (!qrCodeData) {
        res.status(500).send('QR Code not available');
        return;
    }

    try {
        QRCode.toBuffer(qrCodeData, (err, buffer) => {
            if (err) {
                res.status(500).send('Error generating QR Code');
            } else {
                res.setHeader('Content-Type', 'image/png');
                res.send(buffer);
            }
        });
    } catch (error) {
        res.status(500).send('Error generating QR Code');
    }
});

// Initialize the client
client.initialize();

module.exports = app;
