import React, { useState } from 'react';

export default function App() {
  const [businessName, setBusinessName] = useState("سالن زیبایی تخصصی (نسخه دمو)");
  const [managerName, setManagerName] = useState("امیرسام یعقوبی");
  const [managerPhone, setManagerPhone] = useState("09366681963");
  const [managerInstagram, setManagerInstagram] = useState("royalbook_official");
  const [cardNumber, setCardNumber] = useState("6037-9974-xxxx-xxxx");

  const [freeTokens, setFreeTokens] = useState(10);

  const plans = [
    { 
      id: 1, 
      name: "پلن پایه - ۲,۵۰۰,۰۰۰ تومان", 
      features: "ظرفیت ۶ کاربر همزمان | پنل CRM تا ۳۰۰ مشتری | پشتیبانی اختصاصی" 
    },
    { 
      id: 2, 
      name: "پلن پیشرفته - ۶,۰۰۰,۰۰۰ تومان", 
      features: "ظرفیت ۱۲ کاربر همزمان | تحلیل هوشمند بازار و فروش | پنل CRM تا ۱۰۰۰ مشتری | گزارش‌گیری پیشرفته" 
    },
    { 
      id: 3, 
      name: "پلن جامع سازمانی - ۱۲,۰۰۰,۰۰۰ تومان", 
      features: "ظرفیت نامحدود / ۱۰۰۰ کاربر | اتوماسیون کامل هوش مصنوعی | CRM نامحدود و اختصاصی | اتصال مستقیم به پیام‌رسان‌ها" 
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0].name);
  const [selectedPlanFeatures, setSelectedPlanFeatures] = useState(plans[0].features);
  
  const [selectedService, setSelectedService] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("09190358813");
  const [depositPaid, setDepositPaid] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const services = [
    { id: 1, name: "کراتین و احیای تخصصی مو (نرخ مصوب صنفی) - ۳,۵۰۰,۰۰۰ تومان" },
    { id: 2, name: "رنگ، لایت و آمبره مو (تعرفه بازار و اتحادیه) - ۲,۸۰۰,۰۰۰ تومان" },
    { id: 3, name: "شنیون تخصصی عروس و آرایش مو (نرخ صنفی) - ۱,۸۰۰,۰۰۰ تومان" },
    { id: 4, name: "میکاپ تخصصی صورت (نرخ مصوب اتحادیه) - ۲,۵۰۰,۰۰۰ تومان" },
    { id: 5, name: "کاشت و ترمیم ناخن (تعرفه رسمی اصناف) - ۶۵۰,۰۰۰ تومان" },
    { id: 6, name: "کاشت و اکستنشن مژه (نرخ بازار) - ۷۵۰,۰۰۰ تومان" },
    { id: 7, name: "پاکسازی و فیشیال تخصصی پوست (تعرفه مصوب) - ۱,۲۰۰,۰۰۰ تومان" }
  ];

  const handlePlanChange = (e) => {
    const chosenName = e.target.value;
    setSelectedPlan(chosenName);
    const found = plans.find(p => p.name === chosenName);
    if (found) {
      setSelectedPlanFeatures(found.features);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (freeTokens <= 0) {
      alert("⚠️ سهمیه ۱۰ تست رایگان این دستگاه به اتمام رسید و سیستم قفل شد! لطفاً برای فعال‌سازی دائمی، یکی از پلن‌های هوشمند را خریداری کنید.");
      return;
    }
    if (!selectedService || !customerName || !customerPhone || !depositPaid) return;
    
    const code = "ROYAL-AI-" + Math.floor(1000 + Math.random() * 9000);
    setBookingSuccess(code);
    setFreeTokens(freeTokens - 1);
  };

  const sendToBaleManager = () => {
    const text = encodeURIComponent(`🤖 [سیستم هوشمند رویال‌فام - پیام‌رسان بله]:\nرزرو جدید ثبت شد!\n\n👤 مشتری: ${customerName}\n📱 تلفن: ${customerPhone}\n💼 خدمت: ${selectedService}\n💎 پلن: ${selectedPlan}\n🔑 کد پیگیری: ${bookingSuccess}`);
    window.open(`https://ble.ir/${managerPhone}?text=${text}`, '_blank');
  };

  const sendWhatsAppNotice = () => {
    const text = encodeURIComponent(`سلام ${customerName} عزیز، نوبت شما با تعرفه رسمی مصوب اتحادیه ثبت شد. کد پیگیری: ${bookingSuccess}. از انتخاب هلدینگ رویال‌فام سپاسگزاریم.`);
    window.open(`https://wa.me/98${customerPhone.slice(-10)}?text=${text}`, '_blank');
  };

  const sendTelegramNotice = () => {
    const text = encodeURIComponent(`سلام ${customerName} عزیز، نوبت شما با موفقیت ثبت شد. کد پیگیری: ${bookingSuccess}. مدیریت هوشمند رویال‌فام.`);
    window.open(`https://t.me/share/url?url=https://royalbook-ai-demo.vercel.app&text=${text}`, '_blank');
  };

  const addToCalendar = () => {
    const title = encodeURIComponent(`نوبت سالن زیبایی (تعرفه صنفی): ${selectedService}`);
    const details = encodeURIComponent(`مشتری گرامی ${customerName}، نوبت شما ثبت شد. کد پیگیری: ${bookingSuccess}. پشتیبانی رویال‌فام: ${managerPhone}`);
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#f1f5f9', minHeight: '100vh', padding: '16px', fontFamily: 'sans-serif', direction: 'rtl', display: 'flex', justifyContent: 'center', paddingBottom: '80px' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#161616', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '24px', padding: '20px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ textAlign: 'center', backgroundColor: '#1c1a16', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#fbbf24', margin: 0, fontFamily: 'monospace' }}>ROYALBOOK | هلدینگ رویال‌فام</p>
          <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#fde047', margin: 0, lineHeight: '1.4' }}>اولین سیستم رزروآسیون هوش مصنوعی سالن‌ها و اصناف در ایران</p>
          
          <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px dashed rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '8px', fontSize: '10px', color: '#cbd5e1', lineHeight: '1.5', textAlign: 'right' }}>
            ✨ بعد از خرید پلن، آیدی پیج اینستاگرام، بله، واتساپ و تلگرام مدیر هر صنف با اسم برند کسب‌وکار خودتان قرار داده خواهد شد.
          </div>

          <p style={{ fontSize: '9px', color: freeTokens > 0 ? '#38bdf8' : '#ef4444', margin: 0, fontWeight: 'bold' }}>
            {freeTokens > 0 ? `🎁 تست رایگان فعال: ${freeTokens} از ۱۰ بار باقیمانده` : '🔒 سهمیه تست تمام شد (سیستم نیازمند خرید پلن)'}
          </p>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#1c1a16', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: 0 }}>{businessName}</h1>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>مدیریت: {managerName}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', paddingTop: '4px' }}>
            <a href={`https://instagram.com/${managerInstagram}`} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '11px', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
              📸 اینستاگرام مدیر ↗
            </a>
            <a href={`https://ble.ir/${managerPhone}`} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '11px', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
              💬 پیام‌رسان بله ↗
            </a>
            <a href={`https://wa.me/98${managerPhone.slice(-10)}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', textDecoration: 'none', backgroundColor: 'rgba(74, 222, 128, 0.1)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.3)', fontSize: '11px', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
              🟢 واتساپ مدیر ↗
            </a>
            <a href={`https://t.me/${managerPhone}`} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', backgroundColor: 'rgba(96, 165, 250, 0.1)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(96, 165, 250, 0.3)', fontSize: '11px', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
              ✈️ تلگرام مدیر ↗
            </a>
          </div>
          <a href={`tel:${managerPhone}`} style={{ color: '#fde047', textDecoration: 'none', backgroundColor: 'rgba(253, 224, 71, 0.1)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(253, 224, 71, 0.3)', fontSize: '11px', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
            📞 تماس مستقیم با مدیر ({managerPhone}) ↗
          </a>
        </div>

        <div style={{ backgroundColor: '#1c1a16', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '12px', textAlign: 'right', fontSize: '11px', color: '#cbd5e1' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', margin: '0 0 6px 0', textAlign: 'center' }}>📌 راهنمای قرار دادن لینک در اینستاگرام مدیر سالن:</p>
          <ol style={{ margin: '0', paddingRight: '18px', lineHeight: '1.6', color: '#94a3b8' }}>
            <li>وارد پروفایل اینستاگرام سالن خود شوید.</li>
            <li>روی گزینه <strong style={{ color: '#fff' }}>Edit Profile</strong> (ویرایش پروفایل) ضربه بزنید.</li>
            <li>لینک اختصاصی سایت را در قسمت <strong style={{ color: '#fff' }}>Website</strong> وارد کرده و ذخیره کنید.</li>
          </ol>
        </div>

        <div style={{ backgroundColor: '#1c1a16', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24', textAlign: 'center', margin: 0 }}>💎 انتخاب پلن هوشمند و امکانات:</p>
          <select value={selectedPlan} onChange={handlePlanChange} style={{ width: '100%', backgroundColor: '#111', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '10px', color: '#fde047', fontSize: '11px', boxSizing: 'border-box' }}>
            {plans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <div style={{ backgroundColor: '#111', padding: '8px', borderRadius: '8px', border: '1px dashed rgba(245, 158, 11, 0.3)', fontSize: '10px', color: '#cbd5e1', textAlign: 'right' }}>
            <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>✨ ویژگی‌های پلن: </span>
            {selectedPlanFeatures}
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(127, 29, 29, 0.3)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '12px', textAlign: 'center', color: '#fca5a5', fontSize: '11px' }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>⚠️ قوانین مهم رزرو (عدم کنسلی):</p>
          <p style={{ margin: 0, color: '#cbd5e1' }}>وجه واریزی به‌عنوان بیعانه قطعی‌سازی نوبت بوده و قابل استرداد نمی‌باشد.</p>
        </div>

        <div style={{ backgroundColor: '#1c1a16', border: '1px dashed rgba(245, 158, 11, 0.5)', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24', margin: '0 0 8px 0' }}>💳 شماره کارت جهت واریز بیعانه / خرید پلن:</p>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={{ width: '100%', backgroundColor: '#111', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '8px', textAlign: 'center', color: '#fff', fontFamily: 'monospace', fontSize: '13px', boxSizing: 'border-box' }} />
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: '6px 0 0 0' }}>به نام: هلدینگ رویال‌فام (امیرسام یعقوبی)</p>
        </div>

        <form onSubmit={handleBooking} style={{ backgroundColor: '#1a1a1a', border: '1px solid #27272a', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24', textAlign: 'center', margin: 0 }}>رزرو آنلاین (بر اساس تعرفه مصوب صنف آرایشگران)</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', color: '#94a3b8' }}>انتخاب خدمت (نرخ اصناف):</label>
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={{ width: '100%', backgroundColor: '#111', border: '1px solid #3f3f46', borderRadius: '10px', padding: '10px', color: '#e2e8f0', fontSize: '12px', boxSizing: 'border-box' }}>
              <option value="">انتخاب کنید...</option>
              {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', color: '#94a3b8' }}>نام و نام خانوادگی مشتری:</label>
            <input type="text" placeholder="مثال: سارا رضایی" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ width: '100%', backgroundColor: '#111', border: '1px solid #3f3f46', borderRadius: '10px', padding: '10px', color: '#e2e8f0', fontSize: '12px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', color: '#94a3b8' }}>شماره تماس مشتری:</label>
            <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ width: '100%', backgroundColor: '#111', border: '1px solid #3f3f46', borderRadius: '10px', padding: '10px', color: '#e2e8f0', fontSize: '12px', fontFamily: 'monospace', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', paddingTop: '4px', cursor: 'pointer' }}>
            <input type="checkbox" checked={depositPaid} onChange={(e) => setDepositPaid(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#f59e0b' }} />
            <span style={{ fontSize: '11px', color: '#cbd5e1' }}>پرداخت بیعانه و پذیرش قوانین صنفی</span>
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: freeTokens > 0 ? '#f59e0b' : '#52525b', color: '#09090b', fontWeight: 'bold', borderRadius: '10px', border: 'none', fontSize: '12px', cursor: 'pointer' }}>
            {freeTokens > 0 ? `ثبت رزرو هوشمند (${freeTokens} تست رایگان باقی‌مانده)` : '🔒 سهمیه تست تمام شد (سیستم قفل است)'}
          </button>
        </form>

        {bookingSuccess && (
          <div style={{ backgroundColor: 'rgba(6, 78, 59, 0.6)', border: '1px solid #059669', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center', color: '#34d399', fontSize: '11px', fontWeight: 'bold' }}>
            <div>🎉 رزرو موفق! کد پیگیری: {bookingSuccess}</div>
            
            <button onClick={sendToBaleManager} style={{ padding: '8px', backgroundColor: '#38bdf8', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              🤖 ارسال گزارش به مدیر در پیام‌رسان بله
            </button>

            <button onClick={sendWhatsAppNotice} style={{ padding: '8px', backgroundColor: '#4ade80', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              💬 ارسال تاییدیه به مشتری در واتساپ
            </button>

            <button onClick={sendTelegramNotice} style={{ padding: '8px', backgroundColor: '#60a5fa', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              ✈️ ارسال و اشتراک‌گذاری در تلگرام
            </button>

            <button onClick={addToCalendar} style={{ padding: '8px', backgroundColor: '#fde047', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              📅 ثبت یادآوری نوبت در تقویم گوگل (Google Calendar)
            </button>
          </div>
        )}

        <div style={{ backgroundColor: '#121212', border: '1px solid #27272a', borderRadius: '16px', padding: '12px', textAlign: 'center', fontSize: '11px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{ fontWeight: 'bold', color: '#fbbf24', margin: 0 }}>توسعه‌دهنده و مدیرعامل: امیرسام یعقوبی</p>
          <p style={{ margin: 0, color: '#cbd5e1' }}>استارتاپ فناورانه هوش مصنوعی رویال‌فام</p>
          <p style={{ margin: 0, fontFamily: 'monospace', color: '#cbd5e1' }}>تماس پشتیبانی: 09366681963</p>
        </div>

      </div>
    </div>
  );
}
