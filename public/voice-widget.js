/* Global Healing Centre voice assistant widget (English, Telugu, Hindi). Add to your page: <script src="voice-widget.js" charset="utf-8"></script> */
(function(){
if(window.__ghcvLoaded)return;window.__ghcvLoaded=true;
var CSS=`#ghcv-fab{position:fixed;left:16px;bottom:16px;z-index:1100;display:flex;align-items:center;gap:8px;background:#1F6F5B;color:#fff;border:0;border-radius:999px;padding:13px 18px;font:600 15px/1 "Poppins",system-ui,sans-serif;box-shadow:0 4px 15px rgba(0,0,0,.3);cursor:pointer}
#ghcv-panel{position:fixed;left:16px;bottom:76px;z-index:1100;width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 100px);overflow-y:auto;background:#EAF1EC;color:#10302A;border:1px solid #C9D9CF;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.3);padding:14px;display:flex;flex-direction:column;gap:12px;font:15px/1.5 "Noto Sans","Noto Sans Telugu","Noto Sans Devanagari",system-ui,sans-serif}
#ghcv-panel[hidden]{display:none}
#ghcv-panel header{display:flex;justify-content:space-between;align-items:center}
#ghcv-panel header strong{font:600 17px/1.2 Georgia,serif}
#ghcv-close{background:none;border:0;font-size:26px;line-height:1;cursor:pointer;color:#10302A;padding:0 4px}
#ghcv-panel .lang{display:flex;gap:6px;flex-wrap:wrap}
#ghcv-panel .lang button{border:1px solid #C9D9CF;background:#F8FBF9;color:#10302A;padding:7px 12px;border-radius:999px;font:inherit;font-size:14px;cursor:pointer}
#ghcv-panel .lang button[aria-pressed="true"]{background:#1F6F5B;color:#fff;border-color:#1F6F5B}
#ghcv-panel .stage{display:flex;flex-direction:column;align-items:center;gap:6px}
#ghcv-panel .orb{position:relative;width:96px;height:96px;border-radius:50%;border:0;cursor:pointer;color:#fff;background:radial-gradient(circle at 35% 30%,#6BAE9B,#1F6F5B 70%);display:grid;place-items:center;padding:0}
#ghcv-panel .orb svg{width:34px;height:34px}
#ghcv-panel .orb::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:2px solid #1F6F5B;opacity:0}
#ghcv-panel .orb.live::after{animation:ghcvring 1.4s ease-out infinite}
#ghcv-panel .orb.talk{background:radial-gradient(circle at 35% 30%,#F3CF86,#D69A2D 70%);color:#3A2705}
@keyframes ghcvring{0%{transform:scale(.9);opacity:.8}100%{transform:scale(1.3);opacity:0}}
@media (prefers-reduced-motion:reduce){#ghcv-panel .orb.live::after{animation:none;opacity:.6}}
#ghcv-state{font-weight:600}
#ghcv-live{min-height:20px;color:#4F6B63;font-size:13px;text-align:center}
#ghcv-panel .hands{font-size:13px;color:#4F6B63;display:flex;gap:6px;align-items:center}
#ghcv-log{background:#F8FBF9;border:1px solid #C9D9CF;border-radius:12px;padding:10px;min-height:120px;max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:8px}
#ghcv-panel .m{max-width:90%;padding:8px 11px;border-radius:12px;white-space:pre-wrap;font-size:14px}
#ghcv-panel .m.bot{align-self:flex-start;background:#EAF1EC;border:1px solid #C9D9CF}
#ghcv-panel .m.user{align-self:flex-end;background:#D7E8DF}
#ghcv-panel .m a.act{display:inline-block;margin-top:8px;background:#1F6F5B;color:#fff;padding:8px 14px;border-radius:8px;text-decoration:none;font-weight:600}
#ghcv-panel .chips{display:flex;gap:6px;flex-wrap:wrap}
#ghcv-panel .chips button{border:1px solid #1F6F5B;background:transparent;color:#10302A;padding:6px 11px;border-radius:999px;font:inherit;font-size:13px;cursor:pointer}
#ghcv-f{display:flex;gap:6px}
#ghcv-t{flex:1;min-width:0;padding:10px;border-radius:10px;border:1px solid #C9D9CF;background:#fff;color:#10302A;font:inherit;font-size:14px}
#ghcv-f button{padding:0 14px;border-radius:10px;border:0;background:#1F6F5B;color:#fff;font:inherit;font-weight:600;cursor:pointer}
#ghcv-panel .note{font-size:12px;color:#4F6B63;margin:0}
#ghcv-panel button:focus-visible,#ghcv-fab:focus-visible,#ghcv-t:focus-visible{outline:3px solid #D69A2D;outline-offset:2px}`;
var HTML=`<header><strong>Global Healing Centre</strong><button type="button" id="ghcv-close" aria-label="Close">&times;</button></header>
<div class="lang" role="group" aria-label="Language" id="ghcv-lang"><button type="button" data-l="en" aria-pressed="true">English</button><button type="button" data-l="te" aria-pressed="false">తెలుగు</button><button type="button" data-l="hi" aria-pressed="false">हिन्दी</button></div>
<div class="stage" aria-live="polite"><button type="button" class="orb" id="ghcv-orb" aria-label="Tap to talk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button><div id="ghcv-state">Tap to talk</div><div id="ghcv-live"></div><label class="hands"><input type="checkbox" id="ghcv-hands" checked> Keep listening during booking</label></div>
<div id="ghcv-log" aria-label="Conversation"></div>
<div class="chips" id="ghcv-chips"></div>
<form id="ghcv-f" autocomplete="off"><input type="text" id="ghcv-t" placeholder="Or type here" aria-label="Type your message"><button type="submit">Send</button></form>
<p class="note">This assistant shares clinic information and takes booking requests. It does not give medical advice. In an emergency call 108.</p>`;
function mount(){
 var f=document.createElement("link");f.rel="stylesheet";f.href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&family=Noto+Sans+Telugu:wght@400;600&family=Noto+Sans+Devanagari:wght@400;600&display=swap";document.head.appendChild(f);
 var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
 var fab=document.createElement("button");fab.id="ghcv-fab";fab.type="button";fab.setAttribute("aria-label","Talk to our voice assistant");fab.textContent="\uD83C\uDF99\uFE0F Talk / \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F";
 var p=document.createElement("section");p.id="ghcv-panel";p.hidden=true;p.setAttribute("aria-label","Voice assistant");p.innerHTML=HTML;
 document.body.appendChild(fab);document.body.appendChild(p);
 fab.addEventListener("click",function(){p.hidden=!p.hidden});
 document.getElementById("ghcv-close").addEventListener("click",function(){p.hidden=true});
(function(){
var PHONE="919515116919";
var LC={en:"en-IN",te:"te-IN",hi:"hi-IN"};
var denied=false,lang="en",flow=null,data={},rec=null,listening=false,speaking=false,started=false;

var UI={
 en:{tap:"Tap to talk",lis:"Listening…",spk:"Speaking…",ph:"Or type here",hands:"Keep listening during booking",nosr:"Voice does not work in this browser. Please type, or open this page in Chrome, Edge or Safari.",deny:"The microphone does not work in this view. Open this page in Chrome and allow the microphone, or type your message.",chips:["Treatments","About the doctor","Address","Book appointment","Phone number"]},
 te:{tap:"మాట్లాడడానికి నొక్కండి",lis:"వింటున్నాను…",spk:"మాట్లాడుతున్నాను…",ph:"లేదా ఇక్కడ టైప్ చేయండి",hands:"బుకింగ్ సమయంలో వింటూ ఉండు",nosr:"ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ పనిచేయదు. దయచేసి టైప్ చేయండి లేదా Chrome, Edge, Safari లో తెరవండి.",deny:"మైక్రోఫోన్ ఇక్కడ పనిచేయదు. ఈ పేజీని Chrome లో తెరవండి. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి లేదా టైప్ చేయండి.",chips:["చికిత్సలు","డాక్టర్ గురించి","చిరునామా","అపాయింట్‌మెంట్ బుక్","ఫోన్ నంబర్"]},
 hi:{tap:"बोलने के लिए दबाएँ",lis:"सुन रहा हूँ…",spk:"बोल रहा हूँ…",ph:"या यहाँ टाइप करें",hands:"बुकिंग के दौरान सुनते रहें",nosr:"इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करें या Chrome, Edge, Safari में खोलें।",deny:"माइक्रोफ़ोन यहाँ काम नहीं करता। इस पेज को Chrome में खोलें। ब्राउज़र सेटिंग में अनुमति दें या टाइप करें।",chips:["उपचार","डॉक्टर के बारे में","पता","अपॉइंटमेंट बुक करें","फोन नंबर"]}
};

var R={
 greet:{en:"Hello! I am the voice helper of Global Healing Centre. I can tell you about our treatments, the doctor, and our address. I can also book an appointment. What do you want to know?",te:"నమస్కారం! నేను గ్లోబల్ హీలింగ్ సెంటర్ వాయిస్ అసిస్టెంట్‌ని. మా చికిత్సలు, డాక్టర్ షేక్ ఖిజరుల్లా గారి గురించి, చిరునామా లేదా అపాయింట్‌మెంట్ బుకింగ్ గురించి అడగండి.",hi:"नमस्ते! मैं ग्लोबल हीलिंग सेंटर का वॉइस असिस्टेंट हूँ। आप हमारे उपचार, डॉ. शेख खिजरुल्ला, पता या अपॉइंटमेंट बुकिंग के बारे में पूछ सकते हैं।"},
 services:{en:"We give these treatments: Electro Homeopathy, Ayurvedic diet, Acupuncture, Acupressure, and Hijama (cupping).",te:"మేము ఎలక్ట్రో హోమియోపతి, ఆయుర్వేద ఆహారం మరియు పోషణ, ఆక్యుపంక్చర్, ఆక్యుప్రెషర్ మరియు రిఫ్లెక్సాలజీ, హిజామా కప్పింగ్ థెరపీ అందిస్తున్నాము.",hi:"हम इलेक्ट्रो होम्योपैथी, आयुर्वेदिक डाइट और न्यूट्रिशन, एक्यूपंक्चर, एक्यूप्रेशर और रिफ्लेक्सोलॉजी, और हिजामा कपिंग थेरेपी देते हैं।"},
 doctor:{en:"Dr. Shaik Khijarulla is the main doctor. He has BEMS, MDEH and M.Sc. Biochemistry degrees. He has more than 20 years of experience in natural healing.",te:"డాక్టర్ షేక్ ఖిజరుల్లా చీఫ్ ఫిజీషియన్. ఆయన BEMS, MDEH మరియు M.Sc. బయోకెమిస్ట్రీ చదివారు, 20 ఏళ్లకు పైగా సహజ వైద్యంలో అనుభవం ఉంది.",hi:"डॉ. शेख खिजरुल्ला मुख्य चिकित्सक हैं। उनके पास BEMS, MDEH और M.Sc. बायोकेमिस्ट्री की डिग्री है, और प्राकृतिक चिकित्सा में 20 साल से ज़्यादा का अनुभव है।"},
 loc:{en:"Our clinic is at 5-7-7/1, 1st Right Line, Cheruvu Bazar, Khammam, 507001.",te:"మా చిరునామా: 5-7-7/1, 1st రైట్ లైన్, చెరువు బజార్, ఖమ్మం, 507001.",hi:"हमारा पता: 5-7-7/1, 1st राइट लाइन, चेरुवु बाज़ार, खम्मम, 507001।"},
 phone:{en:"Call or WhatsApp us on 9 5 1 5 1 1 6 9 1 9.",te:"క్లినిక్‌కు 9 5 1 5 1 1 6 9 1 9 నంబర్‌కు కాల్ లేదా వాట్సాప్ చేయవచ్చు.",hi:"आप क्लिनिक को 9 5 1 5 1 1 6 9 1 9 पर कॉल या व्हाट्सऐप कर सकते हैं।"},
 hours:{en:"We do not show clinic timings on the website. Please call 9 5 1 5 1 1 6 9 1 9 before you come.",te:"క్లినిక్ సమయాలు వెబ్‌సైట్‌లో లేవు. రాకముందు 9 5 1 5 1 1 6 9 1 9 కు కాల్ చేసి నిర్ధారించుకోండి.",hi:"क्लिनिक का समय वेबसाइट पर नहीं दिया गया है। आने से पहले 9 5 1 5 1 1 6 9 1 9 पर कॉल करके पुष्टि करें।"},
 fees:{en:"The fee depends on the treatment. It is not shown online. Please call 9 5 1 5 1 1 6 9 1 9.",te:"ఫీజు చికిత్సపై ఆధారపడి ఉంటుంది, ఆన్‌లైన్‌లో లేదు. వివరాలకు 9 5 1 5 1 1 6 9 1 9 కు కాల్ చేయండి.",hi:"फीस इलाज पर निर्भर करती है और ऑनलाइन नहीं दी गई है। जानकारी के लिए 9 5 1 5 1 1 6 9 1 9 पर कॉल करें।"},
 cond:{en:"The doctor treats all kinds of pain, including knee pain. He also treats liver, kidney, brain and heart problems, nerve problems, women’s and men’s health problems, and long-term diseases. I cannot check your health or promise a cure. Please book a visit to meet the doctor.",te:"డాక్టర్ ఖిజరుల్లా మోకాళ్ల నొప్పులతో సహా అన్ని నొప్పులు, కాలేయం, మూత్రపిండాలు, మెదడు, గుండె సమస్యలు, నరాల సమస్యలు, స్త్రీ పురుషుల ఆరోగ్య సమస్యలు మరియు దీర్ఘకాల వ్యాధులకు చికిత్స చేస్తారు. నేను నిర్ధారణ చేయలేను, ఫలితాలకు హామీ ఇవ్వలేను. మీ సమస్యకు కన్సల్టేషన్ బుక్ చేసుకోండి.",hi:"डॉ. खिजरुल्ला घुटनों के दर्द सहित सभी दर्द, लिवर, किडनी, ब्रेन और हृदय संबंधी समस्याएँ, नर्वस सिस्टम, महिलाओं और पुरुषों की समस्याएँ और पुरानी बीमारियों का इलाज करते हैं। मैं निदान या परिणाम की गारंटी नहीं दे सकता, कृपया अपने केस के लिए परामर्श बुक करें।"},
 rev:{en:"The clinic has more than 1000 patient reviews. It says more than 10,000 patients were treated in Telangana, Andhra Pradesh and nearby places.",te:"క్లినిక్ 1000కు పైగా రివ్యూలు, తెలంగాణ, ఆంధ్ర ప్రాంతాల్లో 10,000కు పైగా రోగులకు చికిత్స చేసినట్లు తెలిపింది.",hi:"क्लिनिक के 1000 से ज़्यादा रिव्यू हैं और तेलंगाना, आंध्र प्रदेश व आसपास 10,000 से ज़्यादा मरीज़ों के इलाज का दावा है।"},
 emerg:{en:"If this is an emergency, call 108 now or go to the nearest hospital.",te:"ఇది అత్యవసరమైతే వెంటనే 108 కు కాల్ చేయండి లేదా దగ్గరలోని ఆసుపత్రికి వెళ్లండి.",hi:"अगर यह आपात स्थिति है तो तुरंत 108 पर कॉल करें या नज़दीकी अस्पताल जाएँ।"},
 thanks:{en:"You are welcome. Do you need any other help?",te:"సంతోషం. ఇంకేమైనా సహాయం కావాలా?",hi:"आपका स्वागत है। क्या और कुछ मदद चाहिए?"},
 fall:{en:"I can help with treatments, the doctor, address, phone number, or an appointment. What do you want?",te:"చికిత్సలు, డాక్టర్, చిరునామా, ఫోన్ నంబర్ లేదా అపాయింట్‌మెంట్ బుకింగ్‌లో సహాయం చేయగలను. ఏది కావాలి?",hi:"मैं उपचार, डॉक्टर, पता, फोन नंबर या अपॉइंटमेंट बुकिंग में मदद कर सकता हूँ। आपको क्या चाहिए?"},
 qName:{en:"Sure. What is your full name?",te:"సరే. మీ పూర్తి పేరు చెప్పండి.",hi:"ज़रूर। आपका पूरा नाम क्या है?"},
 qPhone:{en:"Thanks, {n}. What is your phone number?",te:"ధన్యవాదాలు {n} గారు. మీ ఫోన్ నంబర్ చెప్పండి.",hi:"धन्यवाद {n}। आपका फोन नंबर क्या है?"},
 badPhone:{en:"I did not hear a 10-digit number. Please say it again, one digit at a time.",te:"10 అంకెల నంబర్ వినిపించలేదు. దయచేసి ఒక్కో అంకె చెప్పండి.",hi:"10 अंकों का नंबर समझ नहीं आया। कृपया एक-एक अंक बोलिए।"},
 qIssue:{en:"What is your health problem, or which treatment do you want?",te:"అపాయింట్‌మెంట్ ఏ ఆరోగ్య సమస్య లేదా చికిత్స కోసం?",hi:"अपॉइंटमेंट किस स्वास्थ्य समस्या या इलाज के लिए है?"},
 done:{en:"Thank you. Tap the button to send your request on WhatsApp. The clinic will confirm your time.",te:"ధన్యవాదాలు. WhatsApp లో మీ అభ్యర్థన పంపడానికి బటన్ నొక్కండి, క్లినిక్ మీ స్లాట్‌ను నిర్ధారిస్తుంది.",hi:"धन्यवाद। WhatsApp पर अपना अनुरोध भेजने के लिए बटन दबाएँ, क्लिनिक आपका स्लॉट कन्फर्म करेगा।"},
 cancel:{en:"Okay, booking cancelled. Do you need any other help?",te:"సరే, బుకింగ్ రద్దు చేసాను. ఇంకేమి సహాయం కావాలి?",hi:"ठीक है, बुकिंग रद्द कर दी। और क्या मदद करूँ?"}
};
var BTN={en:"Send on WhatsApp",te:"WhatsApp లో పంపండి",hi:"WhatsApp पर भेजें"};

var INT=[
 ["emerg",/emergency|ambulance|can.?t breathe|heart attack|accident|అత్యవసర|ఎమర్జెన్సీ|आपात|इमरजेंसी/],
 ["book",/book|appointment|consult|slot|అపాయింట్|బుక్|కలవ|अपॉइंटमेंट|बुक|मिलना|परामर्श/],
 ["hours",/timing|hours|open|close|సమయం|టైమింగ్|समय|टाइमिंग/],
 ["fees",/fee|cost|price|charge|how much|ఫీజు|ధర|ఖర్చు|फीस|कीमत|खर्च|शुल्क/],
 ["loc",/address|where|location|direction|map|ఎక్కడ|చిరునామా|అడ్రస్|पता|कहाँ|कहां|अड्रेस/],
 ["phone",/phone|number|call|contact|whatsapp|ఫోన్|నంబర్|నెంబర్|కాల్|फोन|नंबर|कॉल|संपर्क/],
 ["doctor",/doctor|khijar|qualif|experience|డాక్టర్|అనుభవ|ఖిజ|डॉक्टर|डॉ|अनुभव|खिजर/],
 ["rev",/review|rating|patients|testimonial|రివ్యూ|రోగులు|रिव्यू|मरीज/],
 ["cond",/pain|knee|liver|kidney|heart|brain|diabetes|sugar|arthritis|women|nerve|chronic|back ache|నొప్పి|కాలేయ|మూత్రపిండ|షుగర్|दर्द|लिवर|किडनी|शुगर|घुटने/],
 ["services",/therap|treatment|service|acupunct|acupress|hijama|cupping|electro|ayurved|diet|చికిత్స|థెరపీ|సేవలు|इलाज|उपचार|थेरेपी|सेवा/],
 ["thanks",/thank|bye|ధన్యవాదాలు|థ్యాంక్స్|धन्यवाद|शुक्रिया|बाय/],
 ["greet",/hello|hi\b|hey|namaste|నమస్కారం|హలో|नमस्ते|हेलो|हैलो/]
];

var $=function(i){return document.getElementById("ghcv-"+i)};
var log=$("log"),orb=$("orb"),stateEl=$("state"),liveEl=$("live");
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;

function setState(s){
 orb.classList.toggle("live",s==="lis");orb.classList.toggle("talk",s==="spk");
 stateEl.textContent=s==="lis"?UI[lang].lis:s==="spk"?UI[lang].spk:UI[lang].tap;
 orb.setAttribute("aria-label",UI[lang].tap);
}
function add(who,text,act){
 var d=document.createElement("div");d.className="m "+who;
 var p=document.createElement("span");p.textContent=text;d.appendChild(p);
 if(act){var a=document.createElement("a");a.className="act";a.href=act.href;a.target="_blank";a.rel="noopener";a.textContent=act.label;d.appendChild(document.createElement("br"));d.appendChild(a)}
 log.appendChild(d);log.scrollTop=log.scrollHeight;
}
function pickVoice(){
 var vs=window.speechSynthesis?speechSynthesis.getVoices():[];
 var l=LC[lang].toLowerCase(),b=lang;
 return vs.find(function(v){return v.lang.toLowerCase().replace("_","-")===l})||vs.find(function(v){return v.lang.toLowerCase().indexOf(b)===0})||null;
}
var hinted={};
function hintVoice(){
 if(lang==="en"||hinted[lang])return;
 var vs=speechSynthesis.getVoices();
 if(!vs.length||pickVoice())return;
 hinted[lang]=1;
 add("bot",({te:"\u0c2e\u0c40 \u0c2b\u0c4b\u0c28\u0c4d\u200c\u0c32\u0c4b \u0c24\u0c46\u0c32\u0c41\u0c17\u0c41 \u0c35\u0c3e\u0c2f\u0c3f\u0c38\u0c4d \u0c32\u0c47\u0c28\u0c1f\u0c4d\u0c1f\u0c41 \u0c09\u0c02\u0c26\u0c3f. Settings \u2192 Language \u2192 Text-to-speech \u2192 Google \u2192 Install voice data \u2192 Telugu \u0c32\u0c4b \u0c07\u0c28\u0c4d\u200c\u0c38\u0c4d\u0c1f\u0c3e\u0c32\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f.",hi:"\u0906\u092a\u0915\u0947 \u092b\u094b\u0928 \u092e\u0947\u0902 \u0939\u093f\u0902\u0926\u0940 \u0906\u0935\u093e\u091c\u093c \u0928\u0939\u0940\u0902 \u0926\u093f\u0916 \u0930\u0939\u0940\u0964 Settings \u2192 Language \u2192 Text-to-speech \u2192 Google \u2192 Install voice data \u2192 Hindi \u092e\u0947\u0902 \u0907\u0902\u0938\u094d\u091f\u0949\u0932 \u0915\u0930\u0947\u0902\u0964"})[lang]);
}
function speak(text,after){
 if(!window.speechSynthesis){after&&after();return}
 stopListen();
 try{if(speechSynthesis.speaking||speechSynthesis.pending)speechSynthesis.cancel()}catch(e){}
 var parts=text.match(/[^.!?\u0964]+[.!?\u0964]*/g)||[text];
 var done=false,i=0,v=pickVoice();
 speaking=true;setState("spk");hintVoice();
 var fin=function(){if(done)return;done=true;speaking=false;setState(listening?"lis":"idle");after&&after()};
 var next=function(){
  if(done)return;
  if(i>=parts.length){fin();return}
  var s=parts[i++].trim();if(!s){next();return}
  var k=i;
  var u=new SpeechSynthesisUtterance(s);u.lang=LC[lang];if(v)u.voice=v;u.rate=.95;u.volume=1;
  var wd=setTimeout(function(){if(i===k)next()},s.length*150+2500);
  var go=function(){clearTimeout(wd);if(i===k)next()};
  u.onend=go;u.onerror=go;
  speechSynthesis.speak(u);
 };
 setTimeout(next,150);
 setTimeout(fin,text.length*160+6000);
}
function say(key,vars,act){
 var t=R[key][lang];
 if(vars)for(var k in vars)t=t.replace("{"+k+"}",vars[k]);
 add("bot",t,act);
 speak(t,function(){if((flow&&$("hands").checked)||key==="greet")startListen()});
}
function intent(t){
 t=t.toLowerCase();
 for(var i=0;i<INT.length;i++)if(INT[i][1].test(t))return INT[i][0];
 return "fall";
}
function syncCRM(){try{var t=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});var a={time:t,name:data.name,phone:data.phone,issue:data.issue,status:"Requested (voice)"};var s=localStorage.getItem("ghc_appointments");var L=s?JSON.parse(s):(typeof appointments!=="undefined"?appointments.slice():[]);L.push(a);localStorage.setItem("ghc_appointments",JSON.stringify(L));if(typeof appointments!=="undefined"){appointments.push(a);if(typeof renderCRMData==="function")renderCRMData()}}catch(e){}}
function waLink(){
 var m="Hello Dr. Shaik Khijarulla, I’d like to book an appointment.\nName: "+data.name+"\nPhone: "+data.phone+"\nHealth issue / treatment: "+data.issue+"\n(Sent from the website voice assistant)";
 return "https://wa.me/"+PHONE+"?text="+encodeURIComponent(m);
}
function handle(text){
 text=(text||"").trim();if(!text)return;
 var sc=/[\u0C00-\u0C7F]/.test(text)?"te":/[\u0900-\u097F]/.test(text)?"hi":null;
 if(sc&&sc!==lang&&!flow)setLang(sc);
 add("user",text);liveEl.textContent="";
 if(flow){
  if(/cancel|stop|రద్దు|వద్దు|रद्द|रुको|नहीं चाहिए/i.test(text)){flow=null;data={};return say("cancel")}
  if(flow==="name"){data.name=text;flow="phone";return say("qPhone",{n:text})}
  if(flow==="phone"){
   var d=text.replace(/[^\d]/g,"");
   if(d.length>=10){data.phone=d.slice(-10);flow="issue";return say("qIssue")}
   return say("badPhone");
  }
  if(flow==="issue"){data.issue=text;flow=null;syncCRM();var h=waLink();data={};return say("done",null,{href:h,label:BTN[lang]})}
 }
 var k=intent(text);
 if(k==="book"){flow="name";data={};return say("qName")}
 say(k);
}
function startListen(){
 if(!SR){add("bot",UI[lang].nosr);return}
 if(listening||speaking)return;
 rec=new SR();rec.lang=LC[lang];rec.interimResults=true;rec.maxAlternatives=1;rec.continuous=false;
 var finalText="",lastText="";
 rec.onstart=function(){listening=true;setState("lis")};
 rec.onresult=function(e){
  var s="";for(var i=0;i<e.results.length;i++){s+=e.results[i][0].transcript}
  lastText=s;if(e.results[e.results.length-1].isFinal){finalText=s;try{rec.stop()}catch(x){}}
  liveEl.textContent=s;
 };
 rec.onerror=function(e){
  listening=false;setState("idle");
  if(e.error==="not-allowed"||e.error==="service-not-allowed"){if(!denied){denied=true;add("bot",({en:"The microphone does not work on this preview page. It will work when the page is on the clinic website. For now, type or use the buttons.",te:"ఈ ప్రవ్యూ పేజీలో మైక్రోఫోన్ పనిచేయదు. క్లినిక్ వెబ్సైట్‌లో పెట్టితే వాయిస్ పనిచేస్తుంది. ప్రస్తుతానికి టైప్ చేయండి లేదా బటన్లు నొక్కండి.",hi:"इस प्रिव्यू पेज पर माइक्रोफ़ोन काम नहीं करता। क्लिनिक की वेबसाइट पर रखने से वॉइस चलेगा। अभी टाइप करें या बटन दबाएँ।"})[lang])}}
  else if(e.error==="no-speech"||e.error==="network"||e.error==="language-not-supported"){var M={no:{en:"I did not hear you. Tap the mic and speak again.",te:"మీ మాట వినిపించలేదు. మైక్ నొక్కి మళ్లీ మాట్లాడండి.",hi:"आवाज़ सुनाई नहीं दी। माइक दबाकर फिर बोलिए।"},net:{en:"Voice needs internet. Check your connection, or type your message.",te:"వాయిస్‌కి ఇంటర్నెట్ కావాలి. కనెక్షన్ చూడండి లేదా టైప్ చేయండి.",hi:"वॉइस के लिए इंटरनेट चाहिए। कनेक्शन जाँचें या टाइप करें।"}};add("bot",(e.error==="no-speech"?M.no:M.net)[lang])}
 };
 rec.onend=function(){listening=false;setState(speaking?"spk":"idle");liveEl.textContent="";var q=finalText||lastText;if(q)handle(q)};
 try{rec.start()}catch(err){}
}
function stopListen(){if(rec&&listening){try{rec.onend=null;rec.abort()}catch(e){}listening=false;liveEl.textContent=""}}
function begin(){
 if(!started){started=true;say("greet");return true}
 return false;
}
orb.addEventListener("click",function(){
 if(speaking){speechSynthesis.cancel();speaking=false;setState("idle");return}
 if(listening){stopListen();setState("idle");return}
 if(begin())return;
 startListen();
});
$("f").addEventListener("submit",function(e){
 e.preventDefault();var v=$("t").value;$("t").value="";
 if(!started)started=true;
 handle(v);
});
function chips(){
 var c=$("chips");c.textContent="";
 UI[lang].chips.forEach(function(t){
  var b=document.createElement("button");b.type="button";b.textContent=t;
  b.onclick=function(){started=true;handle(t)};c.appendChild(b);
 });
}
function setLang(l){
 lang=l;
 document.querySelectorAll("#ghcv-lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.l===l)});
 $("t").placeholder=UI[l].ph;
 document.querySelector("#ghcv-panel .hands").lastChild.textContent=" "+UI[l].hands;
 stopListen();if(window.speechSynthesis)speechSynthesis.cancel();flow=null;
 setState("idle");chips();
}
$("lang").addEventListener("click",function(e){var b=e.target.closest("button");if(b)setLang(b.dataset.l)});
if(window.speechSynthesis)speechSynthesis.onvoiceschanged=function(){};
setLang("en");
add("bot","Choose your language: English, తెలుగు or हिन्दी. Then tap the microphone and speak.");
if(!SR)add("bot",UI.en.nosr);
})();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
})();
