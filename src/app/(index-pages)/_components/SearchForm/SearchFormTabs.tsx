import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Tab {
  label: string;
  content: ReactNode;
  icon: ReactNode;
  href: string;
}

interface TabsProps {
  tabs: Tab[];
}

const SearchFormTabs: React.FC<TabsProps> = ({ tabs }) => {
  const pathname = usePathname();
  const tabRefs = useRef<(HTMLElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(() => {
    const idx = tabs.findIndex(
      (tab) =>
        pathname === tab.href ||
        (tab.href !== "/" && pathname?.startsWith(tab.href))
    );
    return idx >= 0 ? idx : 0;
  });

  const setTabRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      tabRefs.current[index] = el;
    },
    []
  );

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const tab = tabRefs.current[activeTab];
      if (tab && indicatorRef.current) {
        indicatorRef.current.style.left = `${tab.offsetLeft}px`;
        indicatorRef.current.style.width = `${tab.offsetWidth}px`;
      }
    };

    const raf = requestAnimationFrame(updateIndicator);

    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [activeTab]);

  return (
    <div className="relative z-10 -mt-24 bg-white pt-4 pb-6 mb-6 border border-gray-100 rounded-xl shadow-lg">
      <nav
        className="relative flex lg:gap-x-4 items-center justify-center border-b border-gray-200"
        role="tablist"
        aria-label="انتخاب سرویس"
      >
        {tabs.map((tab, index) => (
          <Link href={tab.href} key={index}>
            <span
              ref={setTabRef(index)}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              className={`px-6 py-3 text-sm text-center font-semibold transition-colors duration-200 cursor-pointer inline-flex flex-col items-center gap-1 ${
                activeTab === index
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="w-9 h-9 text-2xl">{tab.icon}</div>
              <div>{tab.label}</div>
            </span>
          </Link>
        ))}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-1 rounded-t-lg bg-blue-500 transition-all duration-300 ease-in-out"
        />
      </nav>
      <div className="my-4 px-6">{tabs[activeTab].content}</div>
    </div>
  );
};

export default SearchFormTabs;
