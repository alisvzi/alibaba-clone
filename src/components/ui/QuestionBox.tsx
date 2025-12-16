import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface QuestionBoxProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

export function QuestionBox({
  title = "پرسش های شما",
  items,
  className,
}: QuestionBoxProps) {
  return (
    <section className={cn("w-full mt-10", className)}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-right">
          {title}
        </h2>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-4 text-right hover:no-underline hover:bg-gray-50/50">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-right leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
