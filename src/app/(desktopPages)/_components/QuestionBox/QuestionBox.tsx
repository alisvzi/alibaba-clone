import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function QuestionBox() {
  return (
    <section className="w-full mt-10">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-right">
        پرسش های شما
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
            </AccordionTrigger>
            <AccordionContent>
              امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات
              قیمت بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود.
              بنابراین در صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط
              هواپیما را به روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در
              ایام پرسفر نظیر تعطیلات را دارید، باید هر چه زودتر رزرو بلیط
              هواپیما را انجام دهید.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              آیا امکان خرید بلیط هواپیما برای نوزاد وجود دارد؟
            </AccordionTrigger>
            <AccordionContent>
              بله، امکان خرید بلیط هواپیما برای نوزادان وجود دارد. نوزادان زیر ۲
              سال معمولاً با تخفیف ویژه و بدون صندلی جداگانه سفر می‌کنند.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              چگونه می‌توانم بلیط هواپیما را کنسل کنم؟
            </AccordionTrigger>
            <AccordionContent>
              برای کنسل کردن بلیط هواپیما می‌توانید از طریق پنل کاربری خود اقدام
              کنید یا با پشتیبانی تماس بگیرید. شرایط کنسلی بسته به نوع بلیط و
              ایرلاین متفاوت است.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
