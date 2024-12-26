const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML, CSS, JS

// Kontaktformular-Endpoint
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received request:', { name, email, message });

    // E-Mail-Transporter für GMX
    const transporter = nodemailer.createTransport({
        service: 'gmx',
        auth: {
            user: 'ussama-turgut@gmx.de',
            pass: 'mardin47'
        }
    });

    const mailOptions = {
        from: 'ussama-turgut@gmx.de', // Absender der Nachricht (vom Benutzer)
        to: 'ussama-turgut@outlook.com', // Ihre E-Mail-Adresse
        subject: `Contact form submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send message.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully!');
    });
});

// Starten des Servers
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
