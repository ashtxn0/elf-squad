// sendEmail.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 5000;

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 'Elfsquad0@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3005'); // Replace with your React app URL
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/send-email', (req, res) => {
  console.log("test")
  const { name, address, phone, email, description } = req.body;

  const message = {
    from: 'Elfsquad0@gmail.com',
    to: 'ashton-77@hotmail.com',
    subject: 'New quote request',
    html: `
      <p>Name: ${name}</p>
      <p>Address: ${address}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Description: ${description}</p>
    `,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});