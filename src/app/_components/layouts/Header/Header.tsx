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
      className={`sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-16"
      }`}
    >
      <div className="h-16 px-0 md:px-5 max-w-364 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="GoHome">
            <Image
              src="/img/logo.svg"
              alt="Logo"
              width={130}
              height={48}
              className="w-[130px] h-[48px]"
              sizes="130px"
            />
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
      <div id="header-portal-root" className="border-t border-border bg-white">
        <div className="px-0 md:px-5 max-w-364 mx-auto"></div>
      </div>
    </header>
  );
}
