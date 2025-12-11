"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "قیمت بلیط هواپیمای تهران شیراز چقدر است؟",
    answer:
      "قیمت بلیط هواپیمای تهران شیراز در هر روز به عوامل مختلفی بستگی دارد و در هر زمان متفاوت است. برای مشاهده قیمت روز بلیط تهران شیراز رفت و برگشت و یک‌طرفه در علیبابا جستجو کنید.",
  },
  {
    question: "میزان بار مجاز در پرواز تهران به شیراز چقدر است؟",
    answer:
      "میزان بار مجاز، به ایرلاین یا شرکت هواپیمایی (مانند ماهان، ایران ایر، آسمان و...)، کلاس پرواز، مدل هواپیما و کلاس نرخی بلیط شما بستگی دارد؛ اما میزان بار مجاز برای بلیط‌های کلاس اکونومی معمولا ۱۵ تا ۲۵ کیلوگرم است.",
  },
  {
    question: "جریمه اضافه بار در پرواز تهران شیراز چقدر است؟",
    answer:
      "به طور میانگین نرخ اضافه بار برای هر کیلوگرم برابر با یک درصد قیمت بلیط در همان مسیر است و مبلغ دقیق آن بر حسب قیمت بلیط،‌ طول پرواز و کلاس پرواز شما محاسبه می‌شود.",
  },
  {
    question: "جریمه کنسلی (استرداد) بلیط هواپیمای تهران شیراز چقدر است؟",
    answer:
      "درباره میزان جریمه کنسلی بلیط تهران به شیراز نمی‌توان یک عدد ثابت مطرح کرد؛ بنابراین بهتر است هنگام انتخاب بلیط در علیبابا روی قوانین استرداد کلیک و محتوای آن را مطالعه کنید.",
  },
  {
    question: "برای خرید بلیط هواپیما تهران شیراز ارزان چه باید کرد؟",
    answer:
      "اگر می‌خواهید خرید بلیط هواپیما تهران به شیراز را با قیمت ارزان انجام دهید، سفرتان را به ایام کم‌سفر نزدیک روزهای وسط هفته، روزهای غیرتعطیل و نیمه دوم سال موکول کنید. ضمنا از تقویم قیمتی علیبابا برای پیدا کردن ارزانترین قیمت استفاده کنید.",
  },
  {
    question: "چه‌طور می‌توانم بلیط چارتر تهران شیراز را بخرم؟",
    answer:
      "با انتخاب تهران و شیراز سفر و جستجو در علیبابا، لیست بلیط‌های موجود را خواهید دید. حالا در پنجره «نوع بلیط» در کنار صفحه گزینه چارتر را انتخاب کنید تا در صورت موجود بودن، تنها پروازهای چارتر را ببینید.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-[#1f2937] mb-6">
        سوالات متداول پرواز تهران به شیراز
      </h2>

      <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#e5e7eb] last:border-b-0"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between w-full p-4 text-right hover:bg-[#fafafa] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#fff3e0] rounded-lg flex items-center justify-center">
                  <span className="text-[#f57c00] text-lg">؟</span>
                </div>
                <span className="font-medium text-[#1f2937]">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#6b7280] transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 pr-[60px]">
                <p className="text-sm text-[#6b7280] leading-7">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
