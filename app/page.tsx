"use client";

import { useState } from "react";

const subjectOptions = [
  "تولید و مدیریت زنبورستان",
  "نهاده‌ها و تجهیزات",
  "سلامت زنبور و بیماری‌ها",
  "فرآوری و بسته‌بندی",
  "بازار و فروش",
  "صادرات",
  "قوانین و مقررات",
  "آموزش و توانمندسازی",
  "سایر",
];

const provinces = [
  "آذربایجان شرقی", "آذربایجان غربی", "اردبیل", "اصفهان", "البرز",
  "ایلام", "بوشهر", "تهران", "چهارمحال و بختیاری", "خراسان رضوی",
  "خراسان جنوبی", "خراسان شمالی", "خوزستان", "زنجان", "سمنان",
  "سیستان و بلوچستان", "فارس", "قزوین", "قم", "کردستان",
  "کرمان", "کرمانشاه", "کهگیلویه و بویراحمد", "گلستان", "گیلان",
  "لرستان", "مازندران", "مرکزی", "هرمزگان", "همدان", "یزد",
];

// ⚠️ این URL رو با URL خودت عوض کن
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6WmJcbVoiGBXpX0ZLhFWzbOhb0HbES39DhU1dYNC3xCbRvwEt1STSs_Hqum9fvHI-/exec";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    socialId: "",
    province: "",
    city: "",
    unionName: "",
    activityField: "",
    unionRole: "",
    mainJob: "",
    subject: "",
    challenge: "",
    solution: "",
    question1: "",
    question2: "",
    question3: "",
    additionalNotes: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState("");
  const [fileType, setFileType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // محدودیت حجم: 10 مگابایت
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("حجم فایل نباید بیشتر از 10 مگابایت باشد");
        return;
      }
      
      setFile(selectedFile);
      setFileType(selectedFile.type);
      
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64 = base64String.split(",")[1];
        setFileBase64(base64);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        fileName: file ? file.name : "",
        fileData: fileBase64,
        fileType: fileType,
      };
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      alert("✅ فرم شما با موفقیت ثبت شد. از مشارکت شما سپاسگزاریم!");
      
      // پاک کردن فرم
      setFormData({
        fullName: "", phone: "", socialId: "", province: "", city: "",
        unionName: "", activityField: "", unionRole: "", mainJob: "",
        subject: "", challenge: "", solution: "",
        question1: "", question2: "", question3: "", additionalNotes: "",
      });
      setFile(null);
      setFileBase64("");
      setFileType("");
      
      // ریست کردن input فایل
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      console.error("Error:", error);
      alert("❌ خطا در ارسال فرم. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* بخش تصویر هیرو */}
      <section className="relative w-full">
        <div className="w-full h-64 md:h-96 bg-gradient-to-l from-emerald-900 to-emerald-700 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">طرح تحول صنعت زنبورداری</h1>
            <p className="text-sm md:text-base opacity-90">پایگاه زنبورداری کشور</p>
          </div>
        </div>
      </section>

      {/* بخش ویدیو */}
      <section className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <video controls className="w-full h-full" poster="/video-poster.jpg">
              <source src="/videos/main-video.mp4" type="video/mp4" />
              مرورگر شما از ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>
        </div>
      </section>

      {/* پروفایل سخنران */}
      <section className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-emerald-100 flex-shrink-0 overflow-hidden border-4 border-emerald-600">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">تصویر</div>
          </div>
          <div className="text-center md:text-right flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">نام و نام خانوادگی سخنران</h3>
            <p className="text-emerald-700 font-bold text-base mb-2">رئیس اتحادیه زنبورداران کشور</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              توضیحات کوتاهی درباره سخنران، سوابق و تجربه‌های ایشان در حوزه زنبورداری.
            </p>
          </div>
        </div>
      </section>

      {/* متن معرفی */}
      <section className="max-w-4xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4 text-center">
            صدای فعالان زنبورداری، پشتوانه تصمیم‌سازی
          </h2>
          <div className="text-gray-700 leading-8 text-justify space-y-4">
            <p>
              صنعت زنبورداری زمانی رشد می‌کند که صدای زنبورداران و فعالان این حوزه شنیده شود. به همین دلیل از همه زنبورداران، اتحادیه‌ها، تشکل‌ها، کارشناسان و فعالان حوزه عسل دعوت می‌کنیم تجربه‌ها، دغدغه‌ها، مشکلات و ایده‌های خود را با ما به اشتراک بگذارند.
            </p>
            <p>
              این پرسش‌ها در قالب یک طرح تحول برای آینده صنعت زنبورداری کشور تهیه شده است. هدف ما این است که قبل از هر تصمیم و برنامه‌ریزی، نظر کسانی را بشنویم که سال‌ها در این حوزه فعالیت کرده‌اند و با مسائل آن از نزدیک آشنا هستند. دیدگاه‌ها و پیشنهادهای شما می‌تواند به طراحی راهکارهای عملی‌تر و تصمیم‌های مؤثرتر برای آینده این صنعت کمک کند.
            </p>
          </div>
        </div>
      </section>

      {/* فرم مشارکت */}
      <section className="max-w-4xl mx-auto px-4 mt-10 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-8 text-center border-b-2 border-emerald-600 pb-4">
            فرم مشارکت در شناسایی چالش‌ها و ارائه راهکارهای صنعت زنبورداری
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* اطلاعات فردی */}
            <fieldset className="border border-emerald-200 rounded-lg p-6 bg-emerald-50/30">
              <legend className="text-lg font-bold text-emerald-800 px-3 bg-white rounded">
                اطلاعات فردی
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField label="نام و نام خانوادگی" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <InputField label="شماره تماس" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                <InputField label="شناسه شبکه‌های اجتماعی" name="socialId" value={formData.socialId} onChange={handleChange} />
                <SelectField label="استان" name="province" value={formData.province} onChange={handleChange} options={provinces} required />
                <InputField label="شهر" name="city" value={formData.city} onChange={handleChange} required />
                <InputField label="نام اتحادیه / تعاونی / مجموعه" name="unionName" value={formData.unionName} onChange={handleChange} />
                <InputField label="حوزه فعالیت" name="activityField" value={formData.activityField} onChange={handleChange} />
                <InputField label="مسئولیت اتحادیه" name="unionRole" value={formData.unionRole} onChange={handleChange} />
                <InputField label="شغل اصلی" name="mainJob" value={formData.mainJob} onChange={handleChange} />
              </div>
            </fieldset>

            {/* موضوع */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                موضوع مورد نظر
                <span className="text-gray-500 font-normal mr-2 text-xs">(موضوع چالش یا پیشنهاد شما در کدام حوزه قرار می‌گیرد؟)</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
              >
                <option value="">انتخاب کنید...</option>
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <TextAreaField label="شرح چالش" hint="مهم‌ترین چالش یا مسئله‌ای که در حوزه فعالیت خود با آن مواجه هستید را شرح دهید." name="challenge" value={formData.challenge} onChange={handleChange} required rows={5} />
            <TextAreaField label="راهکار پیشنهادی" hint="به نظر شما چه اقدام یا راهکاری می‌تواند به حل این مسئله کمک کند؟" name="solution" value={formData.solution} onChange={handleChange} required rows={5} />

            {/* سوالات کلیدی */}
            <fieldset className="border border-amber-200 rounded-lg p-6 bg-amber-50/30">
              <legend className="text-lg font-bold text-amber-800 px-3 bg-white rounded">سوالات کلیدی</legend>
              <div className="space-y-5 mt-4">
                <TextAreaField label="سوال اول" hint="آیا تجربه موفقی داشته‌اید که به نظر شما دیگران نیز بتوانند از آن استفاده کرده و آن را اجرا کنند؟ لطفاً توضیح دهید." name="question1" value={formData.question1} onChange={handleChange} rows={4} />
                <TextAreaField label="سوال دوم" hint="مهم‌ترین انتظارات شما از رئیس‌جمهور در زمینه حمایت از زنبورداران، توسعه بازار، صادرات و رفع موانع تولید چیست؟" name="question2" value={formData.question2} onChange={handleChange} rows={4} />
                <TextAreaField label="سوال سوم" hint="اگر مسئولیت اداره اتحادیه زنبورداران کشور را بر عهده داشتید، مهم‌ترین برنامه‌ها و اقدامات شما برای حمایت از زنبورداران چه بود؟" name="question3" value={formData.question3} onChange={handleChange} rows={4} />
              </div>
            </fieldset>

            {/* مستندات */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                مستندات
                <span className="text-gray-500 font-normal mr-2 text-xs">(اختیاری - بارگذاری فایل، تصویر یا مستندات مرتبط - حداکثر 10 مگابایت)</span>
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white file:ml-4 file:px-4 file:py-2 file:border-0 file:bg-emerald-600 file:text-white file:rounded-md file:cursor-pointer hover:file:bg-emerald-700 transition"
              />
              {file && (
                <p className="text-sm text-emerald-700 mt-2">
                  فایل انتخاب‌شده: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} مگابایت)
                </p>
              )}
            </div>

            <TextAreaField label="توضیحات تکمیلی" hint="در صورت تمایل، نکات و پیشنهادهای تکمیلی خود را ثبت نمایید." name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={4} />

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "در حال ارسال..." : "ثبت فرم"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

// کامپوننت‌های کمکی
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

function InputField({ label, name, value, onChange, type = "text", required = false }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

function SelectField({ label, name, value, onChange, options, required = false }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
      >
        <option value="">انتخاب کنید...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  hint?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

function TextAreaField({ label, hint, name, value, onChange, required = false, rows = 4 }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 mb-2">{hint}</p>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition resize-y"
      />
    </div>
  );
}