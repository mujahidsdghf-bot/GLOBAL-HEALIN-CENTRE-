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
    
    res.json({ success: true, message: 'Appointment booked successfully!' });
});

// ==========================================
// టెలిగ్రామ్ & ఫేస్‌బుక్ సోషల్ మీడియా ఆటో-పోస్టర్
// ==========================================

// 1. టెలిగ్రామ్ కాన్ఫిగరేషన్
const TELEGRAM_BOT_TOKEN = '8638874544:AAGWvGPJ1wmHmLX9UYyfJc_B1Ff1bcxStAY';
const TELEGRAM_CHAT_ID = '@globalhealingcentre';

// 2. ఫేస్‌బుక్ కాన్ఫిగరేషన్
const PAGE_ID = '10804594488354';
const PAGE_ACCESS_TOKEN = 'EAAXxE1AdEygBS7tciKCHjJ6K8WycPaVeosZAT9ulPfSQGciyE54N7gZCD7y8FrPyuI1GFSA7dGBnLhSZC4OATAZCCgVBUGQUv3bmlOgS4DCkeREc2bz6azQwIHkBqqSlYbKKFRLZAw6ihwIqeBtxBtnnbnU3rVPEorZAXbEPCY53x0UyVRWSIl5jcL0Qkw8KZCQ3PtxnZCMFwHbKyHJnRhv0FkGkSZAt6JxNp7fg343YayqRCdf97NLH5Wy8mJAcGLFn151qTjfwtxA9bxZChpjmRaYlYo';

// డైలీ హెల్త్ టిప్స్ జాబితా
const dailyHealthTips = [
    "🌿 Global Healing Centre Tip: Drink warm water early in the morning to boost metabolism and detoxify your kidneys. Contact Dr. Shaik Khijarulla at 9515116919.",
    "🌿 Acupuncture & Pain Relief: Natural healing is the best way to cure chronic joint and knee pains without side effects. Visit us at Cheruvu Bazar, Khammam.",
    "🌿 Ayurvedic Diet & Nutrition: Eat according to your body type (Dosha) for lifelong immunity and energy. Book your appointment today at globalhealingcentre.co.in",
    "🌿 Electro Homeopathy: Safe, gentle, and effective natural remedies for chronic disorders. Trust Global Healing Centre, Khammam.",
    "🌿 Hijama & Cupping Therapy: Detox your blood, improve blood circulation, and relieve deep body pain naturally.",
    "🌿 Acupressure & Reflexology: Stimulate natural healing points on your hands and feet for instant stress relief and pain management."
];

// క్లినిక్ పోస్టర్ల జాబితా
const healthPosters = [
    'https://globalhealingcentre.co.in/1005731516.jpg', // Electro Homeopathy
    'https://globalhealingcentre.co.in/1005731524.jpg', // Ayurvedic Diet
    'https://globalhealingcentre.co.in/1005731509.jpg', // Hijama & Cupping
    'https://globalhealingcentre.co.in/1005635705.jpg'  // Acupuncture
];

// టెలిగ్రామ్‌కి పోస్ట్ చేసే ఫంక్షన్
async function postToTelegram(tip, photoUrl) {
    try {
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            photo: photoUrl,
            caption: tip
        });
        console.log('Successfully posted photo and tip to Telegram Channel!');
    } catch (err) {
        console.error('Telegram Post Error:', err.response?.data || err.message);
    }
}

// ఫేస్‌బుక్‌కి పోస్ట్ చేసే ఫంక్షన్
async function postToFacebook(tip, photoUrl) {
    try {
        const facebookUrl = `https://graph.facebook.com/v20.0/${PAGE_ID}/photos`;
        await axios.post(facebookUrl, {
            url: photoUrl,
            caption: tip,
            access_token: PAGE_ACCESS_TOKEN
        });
        console.log('Successfully posted photo and tip to Facebook Page!');
    } catch (err) {
        console.error('Facebook Post Error:', err.response ? err.response.data : err.message);
    }
}

// రెండు ప్లాట్‌ఫారమ్‌లకూ కలిపి ఆటో-పోస్ట్ ట్రిగర్ చేసే మెయిన్ ఫంక్షన్
async function sendAutomatedPosts() {
    try {
        const randomTip = dailyHealthTips[Math.floor(Math.random() * dailyHealthTips.length)];
        const randomPhoto = healthPosters[Math.floor(Math.random() * healthPosters.length)];

        console.log('Starting automated social media posting (Telegram & Facebook)...');

        // రెండింటికీ సమాంతరంగా పంపడం
        await Promise.all([
            postToTelegram(randomTip, randomPhoto),
            postToFacebook(randomTip, randomPhoto)
        ]);

        console.log('All scheduled social media posts completed successfully!');
    } catch (error) {
        console.error('Error in automated posting routine:', error.message);
    }
}

// 1. రోజుకు 8 సార్లు ఆటోమేటిక్‌గా పోస్ట్ అవ్వడానికి షెడ్యూల్ (ఉదయం 8, 10, మధ్యాహ్నం 12, 2, సాయంత్రం 4, 6, రాత్రి 8, 10 గంటలకు)
cron.schedule('0 8,10,12,14,16,18,20,22 * * *', () => {
    sendAutomatedPosts();
});

// 2. వెంటనే పోస్ట్ వెళ్తుందో లేదో చెక్ చేయడానికి టెస్ట్ లింక్ (Browser లో /api/test-social అని టైప్ చేయండి)
app.get('/api/test-social', async (req, res) => {
    try {
        await sendAutomatedPosts();
        res.json({ success: true, message: 'Test social media posts sent to Telegram and Facebook successfully!' });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
