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
// టెలిగ్రామ్ & సోషల్ మీడియా ఆటో-పోస్టర్
// ==========================================
const TELEGRAM_BOT_TOKEN = '8638874544:AAGWvGPJ1wmHmLX9UYyfJc_B1Ff1bcxStAY';
const TELEGRAM_CHAT_ID = '@globalhealingcentre'; // మీ టెలిగ్రామ్ ఛానెల్ యూజర్‌నేమ్

const dailyHealthTips = [
    "🌿 Global Healing Centre Tip: Drink warm water early in the morning to boost metabolism and detoxify your kidneys. Contact Dr. Shaik Khijarulla at 9515116919.",
    "🌿 Acupuncture & Pain Relief: Natural healing is the best way to cure chronic joint and knee pains without side effects. Visit us at Cheruvu Bazar, Khammam.",
    "🌿 Ayurvedic Diet & Nutrition: Eat according to your body type (Dosha) for lifelong immunity and energy. Book your appointment today at globalhealingcentre.co.in",
    "🌿 Electro Homeopathy: Safe, gentle, and effective natural remedies for chronic disorders. Trust Global Healing Centre, Khammam.",
    "🌿 Hijama & Cupping Therapy: Detox your blood, improve blood circulation, and relieve deep body pain naturally.",
    "🌿 Acupressure & Reflexology: Stimulate natural healing points on your hands and feet for instant stress relief and pain management."
];

async function sendAutomatedPosts() {
    try {
        const randomTip = dailyHealthTips[Math.floor(Math.random() * dailyHealthTips.length)];
        console.log('Publishing scheduled social media post:', randomTip);

        // 1. Telegram Bot API ద్వారా ఆటోమేటిక్ పోస్ట్
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: randomTip
        });
        console.log('Successfully posted to Telegram Channel!');

        // 2. WhatsApp Broadcast API Integration (భవిష్యత్తులో API టోకెన్ వచ్చినప్పుడు వాడవచ్చు)
        // await axios.post('https://api.whatsapp.com/send', { phone: '9515116919', message: randomTip });

        // 3. Facebook / Instagram Graph API Integration (భవిష్యత్తులో టోకెన్ వచ్చినప్పుడు వాడవచ్చు)
        // await axios.post('https://graph.facebook.com/v17.0/YOUR_PAGE_ID/feed', { message: randomTip, access_token: 'YOUR_FB_TOKEN' });

    } catch (error) {
        console.error('Error in automated social posting:', error.response?.data || error.message);
    }
}

// రోజుకు 4 సార్లు ఆటోమేటిక్‌గా పోస్ట్ అవ్వడానికి షెడ్యూల్ (ఉదయం 9, మధ్యాహ్నం 1, సాయంత్రం 5, రాత్రి 8 గంటలకు)
cron.schedule('0 9,13,17,20 * * *', () => {
    sendAutomatedPosts();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
