"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { CircleQuestionMark, Luggage, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";

export function Header() {
  const isVisible = useScrollDirection();

  return (
    <header
      className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ease-in-out transform ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="px-0 md:px-5 max-w-364 mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="GoHome" className="">
            <Image src="/img/logo.svg" alt="Logo" width={130} height={48} />
          </Link>
          <NavMenu />
        </div>

        <div className="flex items-center gap-3">
          <NavButton
            title="مرکز پشتیبانی آنلاین"
            icon={<CircleQuestionMark width={20} height={20} />}
          />
          <NavButton
            title="سفرهای من"
            icon={<Luggage width={20} height={20} />}
          />
          <NavButton
            title="ورود یا ثبت‌نام"
            icon={<User width={20} height={20} />}
          />
        </div>
      </div>
    </header>
  );
}
