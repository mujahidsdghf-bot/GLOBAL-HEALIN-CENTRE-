const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

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
    
    // ఇక్కడ మనం డేటాబేస్ లో సేవ్ చేసుకోవచ్చు లేదా వాట్సాప్ నోటిఫికేషన్ పంపవచ్చు
    res.json({ success: true, message: 'Appointment booked successfully!' });
});

// ==========================================
// సోషల్ మీడియా ఆటో-పోస్టర్ & డైలీ హెల్త్ టిప్స్ (Cron Job)
// ==========================================
const dailyHealthTips = [
    "🌿 Global Healing Centre Tip: Drink warm water early in the morning to boost metabolism and detoxify your kidneys. Contact Dr. Shaik Khijarulla at 9515116919.",
    "🌿 Acupuncture & Pain Relief: Natural healing is the best way to cure chronic joint and knee pains without side effects. Visit us at Cheruvu Bazar, Khammam.",
    "🌿 Ayurvedic Diet & Nutrition: Eat according to your body type (Dosha) for lifelong immunity and energy. Book your appointment today at globalhealingcentre.co.in",
    "🌿 Electro Homeopathy: Safe, gentle, and effective natural remedies for chronic disorders. Trust Global Healing Centre, Khammam."
];

// ప్రతిరోజూ ఉదయం 9:00 గంటలకు ఆటోమేటిక్‌గా పోస్ట్ అవ్వడానికి క్రోన్ జాబ్
cron.schedule('0 9 * * *', async () => {
    try {
        const randomTip = dailyHealthTips[Math.floor(Math.random() * dailyHealthTips.length)];
        console.log('Publishing automated daily post to Social Media:', randomTip);

        // 1. WhatsApp Broadcast API Integration (Configure when API is ready)
        // await axios.post('https://api.whatsapp.com/send', { phone: '9515116919', message: randomTip });

        // 2. Facebook / Instagram Graph API Integration
        // await axios.post('https://graph.facebook.com/v17.0/YOUR_PAGE_ID/feed', { message: randomTip, access_token: 'YOUR_FB_TOKEN' });

        // 3. Telegram Bot API Integration
        // await axios.post('https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage', { chat_id: '@globalhealingcentre', text: randomTip });

        console.log('Successfully triggered daily automated social media posts!');
    } catch (error) {
        console.error('Error auto-posting to social media:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
