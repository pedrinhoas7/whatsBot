const express = require('express');
const QRCode = require('qrcode');
const { Client } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

let qrCodeData = ''; // To store the QR code data

// Create a new instance of the client
const client = new Client({
    puppeteer: {
        headless: false,
        args: ['--no-sandbox'],
        timeout: 60000 // Increased timeout to 60 seconds
    }
});

// Generate QR Code for authentication
client.on('qr', (qr) => {
    qrCodeData = qr; // Store QR Code data
    console.log('QR Code data:', qr);
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
        message.reply('Our business hours are Monday to Friday, from 9 AM to 6 PM.');
    } else if (message.body.toLowerCase().includes('falar com')) {
        message.reply('A speech therapist will contact you soon.');
    } else if (message.body.toLowerCase().includes('olá')) {
        message.reply('Hello! How can I assist you? You can ask about consultations, business hours, or request to speak with a speech therapist.');
    }
});

app.get('/', async (req, res) => {
    if (!qrCodeData) {
        res.status(500).send('QR Code data is not available yet.');
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
