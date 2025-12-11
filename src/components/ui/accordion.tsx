"use client";

import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type * as React from "react";

// Question mark icon matching the reference design
function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={cn("shrink-0 text-sky-500", className)}
    >
      <path d="M14.442 16.905c0-1.427-.177-2.564-.531-3.411-.322-.77-.931-1.612-1.827-2.525l-.734-.726c-.787-.786-1.298-1.361-1.533-1.726a3.775 3.775 0 0 1-.646-2.126c0-1.005.249-1.776.747-2.312.498-.536 1.23-.804 2.197-.804.93 0 1.676.26 2.241.782.565.522.847 1.233.847 2.133h3.921c-.028-1.905-.68-3.413-1.953-4.524C15.898.556 14.212 0 12.115 0 9.951 0 8.266.548 7.06 1.645 5.853 2.74 5.25 4.275 5.25 6.248c0 1.752.814 3.476 2.442 5.17l1.996 1.954c.709.813 1.072 1.991 1.092 3.533h3.662Zm.273 5.027c0-.642-.199-1.159-.596-1.551-.397-.393-.936-.59-1.616-.59-.69 0-1.233.204-1.63.611-.397.407-.596.917-.596 1.53 0 .584.194 1.075.582 1.472.387.397.936.596 1.644.596.709 0 1.255-.199 1.637-.596.384-.397.575-.888.575-1.472Z" />
    </svg>
  );
}

// Chevron icon for expand/collapse
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={cn("shrink-0 transition-transform duration-200", className)}
    >
      <path d="M21.266 7.302a.75.75 0 0 1 1.037 1.08l-.069.066-9.75 8.25a.75.75 0 0 1-.89.058l-.078-.058-9.75-8.25a.75.75 0 0 1 .893-1.202l.075.056L12 15.142l9.266-7.84Z" />
    </svg>
  );
}

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-gray-200 last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center gap-3 py-4 px-3 md:py-4 md:px-4 text-right font-bold text-sm md:text-base transition-all outline-none",
          "hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-1 rounded-md",
          // rotate the chevron svg when the primitive trigger has state=open
          "[&[data-state=open]>*:last-child>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <div className="rounded-full bg-sky-500/20 p-1">
          <QuestionIcon />
        </div>
        <span className="flex-1 text-gray-800">{children}</span>
        {/* use a non-button element here to avoid nesting a button inside the trigger button */}
        <span
          aria-hidden
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronIcon className="text-gray-500" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div
        className={cn(
          "px-4 md:px-8 pb-4 text-gray-600 leading-relaxed",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
