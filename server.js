const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (HTML, CSS, Images) రన్ చేయడానికి
app.use(express.static(path.join(__dirname, 'public')));

// అపాయింట్‌మెంట్ సేవ్ చేయడానికి API రూట్
app.post('/api/book-appointment', (req, res) => {
    const { name, phone, issue } = req.body;
    console.log(`New Appointment Received -> Name: ${name}, Phone: ${phone}, Issue: ${issue}`);
    
    // ఇక్కడ మనం డేటాబేస్ (MongoDB/PostgreSQL) లో సేవ్ చేసుకోవచ్చు
    res.json({ success: true, message: 'Appointment booked successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
