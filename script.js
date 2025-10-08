// Dafter: theme + language toggles + basic form demo
const html = document.documentElement;
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const yearSpan = document.getElementById('year');

const i18nStrings = {
  en: {
    brand: "Dafter",
    nav_features: "Features",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    hero_title: "Share notes. Study smarter.",
    hero_sub: "A clean starter for a notes platform—bilingual (Arabic/English) with a pastel vibe.",
    cta_primary: "See features",
    cta_secondary: "Get in touch",
    features_title: "Features",
    f1_title: "Fast & responsive",
    f1_desc: "Built with clean HTML, CSS, and JavaScript—no heavy frameworks.",
    f2_title: "Arabic & English",
    f2_desc: "Toggle language and page direction (LTR/RTL) instantly.",
    f3_title: "Pastel theme + Dark mode",
    f3_desc: "Soft baby yellow & pink theme with a one-click dark/light switch.",
    pricing_title: "Pricing",
    p1_title: "Free",
    p1_1: "Basic access",
    p1_2: "Community notes",
    p1_3: "Email support",
    p2_title: "Student",
    p2_1: "Unlimited notes",
    p2_2: "Private folders",
    p2_3: "Priority support",
    p3_title: "Team",
    p3_1: "5 seats",
    p3_2: "Shared spaces",
    p3_3: "Admin tools",
    p_cta: "Choose",
    popular: "Popular",
    faq_title: "FAQ",
    faq_q1: "How do I customize Dafter?",
    faq_a1: "Edit text in index.html, colors in styles.css, and behavior in script.js.",
    faq_q2: "Does the contact form send emails?",
    faq_a2: "This template is front-end only. Connect it to Formspree, Netlify Forms, or your own backend.",
    contact_title: "Contact",
    label_name: "Name",
    label_email: "Email",
    label_msg: "Message",
    send: "Send",
    footer_tag: "Made with ♥ by Bedour Almutairi"
  },
  ar: {
    brand: "دفتر",
    nav_features: "المزايا",
    nav_pricing: "الأسعار",
    nav_faq: "الأسئلة الشائعة",
    nav_contact: "تواصل",
    hero_title: "شارك ملاحظاتك. ذاكر بذكاء.",
    hero_sub: "قالب نظيف لمنصة ملاحظات — ثنائي اللغة (عربي/إنجليزي) وبألوان باستيل.",
    cta_primary: "شاهد المزايا",
    cta_secondary: "تواصل معنا",
    features_title: "المزايا",
    f1_title: "سريع ومتجاوب",
    f1_desc: "مبني بـ HTML وCSS وJavaScript بدون أطر ثقيلة.",
    f2_title: "عربي وإنجليزي",
    f2_desc: "بدّل اللغة واتجاه الصفحة (RTL/LTR) فورًا.",
    f3_title: "ثيم باستيل + الوضع الليلي",
    f3_desc: "ألوان أصفر وبنّي فاتح مع مفتاح تبديل للوضع الفاتح/الداكن.",
    pricing_title: "الأسعار",
    p1_title: "مجاني",
    p1_1: "وصول أساسي",
    p1_2: "ملاحظات المجتمع",
    p1_3: "دعم عبر البريد",
    p2_title: "طالب",
    p2_1: "ملاحظات غير محدودة",
    p2_2: "مجلدات خاصة",
    p2_3: "دعم أولوية",
    p3_title: "فريق",
    p3_1: "٥ مستخدمين",
    p3_2: "مساحات مشتركة",
    p3_3: "أدوات إدارة",
    p_cta: "اختيار",
    popular: "الأكثر شيوعًا",
    faq_title: "الأسئلة الشائعة",
    faq_q1: "كيف أخصص موقع دفتر؟",
    faq_a1: "عدّل النص في index.html، والألوان في styles.css، والسلوك في script.js.",
    faq_q2: "هل يرسل نموذج التواصل رسائل؟",
    faq_a2: "هذا القالب واجهة أمامية فقط. اربطه بخدمة مثل Formspree أو Netlify Forms أو خادمك الخاص.",
    contact_title: "تواصل",
    label_name: "الاسم",
    label_email: "البريد الإلكتروني",
    label_msg: "رسالتك",
    send: "إرسال",
    footer_tag: "صُنع بحب بواسطة بدور المطيري"
  }
};

function setLang(lang){
  const isArabic = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  for(const el of document.querySelectorAll('[data-i18n]')){
    const key = el.getAttribute('data-i18n');
    el.textContent = i18nStrings[lang][key] ?? el.textContent;
  }
  localStorage.setItem('lang', lang);
  langToggle.textContent = isArabic ? 'English' : 'العربية';
}

function setTheme(theme){
  document.documentElement.classList.toggle('light', theme === 'light');
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'light' ? '☾' : '☀';
}

langToggle?.addEventListener('click', ()=>{
  const current = localStorage.getItem('lang') || 'en';
  setLang(current === 'en' ? 'ar' : 'en');
});

themeToggle?.addEventListener('click', ()=>{
  const isLight = document.documentElement.classList.contains('light');
  setTheme(isLight ? 'dark' : 'light');
});

function onSubmit(e){
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const msg = document.getElementById('formStatus');
  msg.textContent = (document.documentElement.lang === 'ar')
    ? 'تم الإرسال (تجريبي).'
    : 'Submitted (demo only).';
  console.log('Form data', data);
  form.reset();
  return false;
}

(function init(){
  yearSpan.textContent = new Date().getFullYear();
  // Set defaults
  setTheme(localStorage.getItem('theme') || 'light');
  setLang(localStorage.getItem('lang') || 'en');
})();