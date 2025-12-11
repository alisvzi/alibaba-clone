import {
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-8 mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-100 pb-10">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 relative">
              {/* Placeholder if image missing, using icon */}
              <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                <Phone size={32} />
              </div>
            </div>
            <h3 className="font-bold text-gray-700 text-lg">
              رتبه اول فروش بلیط
            </h3>
            <p className="text-gray-500 text-sm">
              معتبرترین سامانه خرید بلیط در ایران
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                <UsersIcon size={32} />
              </div>
            </div>
            <h3 className="font-bold text-gray-700 text-lg">
              پشتیبانی ۲۴ ساعته
            </h3>
            <p className="text-gray-500 text-sm">
              پاسخگویی در تمام ساعات شبانه روز
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                <ShieldCheckIcon size={32} />
              </div>
            </div>
            <h3 className="font-bold text-gray-700 text-lg">تضمین قیمت</h3>
            <p className="text-gray-500 text-sm">
              ارائه بهترین قیمت‌های موجود در بازار
            </p>
          </div>
        </div>

        {/* Links & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-10">
          {/* Column 1: About */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-lg mb-4">علی‌بابا</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  چرا علی‌بابا
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  علی‌بابا پلاس
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  بیمه مسافرتی
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  مجله علی‌بابا
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-lg mb-4">خدمات مشتریان</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  مرکز پشتیبانی آنلاین
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  راهنمای خرید
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  راهنمای استرداد
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors"
                >
                  پرسش و پاسخ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-xl text-gray-800">
                    تلفن پشتیبانی: ۴۳۹۰۰۰۰۰ - ۰۲۱
                  </span>
                  <span className="text-gray-500 text-sm">
                    پاسخگویی ۲۴ ساعته، ۷ روز هفته
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Twitter size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Youtube size={24} />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-500 border-t border-gray-200 pt-4">
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  دفتر پشتیبانی: اکباتان، نبش اتوبان لشگری، کوی بیمه، خیابان
                  بیمه چهارم، پلاک ۱
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/img/logo.svg"
              alt="Alibaba"
              width={80}
              height={30}
              className="grayscale opacity-50"
            />
            <span className="text-xs text-gray-400">
              کلیه حقوق این سرویس (وب‌سایت و اپلیکیشن‌های موبایل) محفوظ و متعلق
              به شرکت سفرهای علی‌بابا می‌باشد. (نسخه 1.2.0)
            </span>
          </div>
          <div className="flex gap-4">
            {/* Certifications Placeholders */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
              نماد اعتماد
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
              ساماندهی
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
              حقوق مسافر
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Icons
const UsersIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldCheckIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Footer;
