import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useIsMobile from "@/hooks/useIsMobile";
import Link from "next/link";
import ListItem from "./ListItem";

const NavMenu: React.FC = () => {
  const isMobile = useIsMobile();

  const driverClass =
    "self-stretch min-h-px min-w-px my-1.5 mx-1 border-0 grow-0 shrink basis-0 max-w-full bg-border";

  return (
    <NavigationMenu viewport={isMobile} dir="rtl">
      <NavigationMenuList className="flex-nowrap gap-1 no-scrollbar">
        <ListItem
          title="بلیط هواپیما"
          option={[
            { id: "1", href: "/", title: "پرواز داخلی" },
            { id: "2", href: "/iranout", title: "پرواز خارجی" },
          ]}
        />
        <NavigationMenuItem
          aria-hidden
          className={`${driverClass} hidden md:block`}
        />
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/train-ticket">بلیط قطار</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          aria-hidden
          className={`${driverClass} hidden md:block`}
        />
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/bus-ticket">بلیط اتوبوس</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          aria-hidden
          className={`${driverClass} hidden md:block`}
        />
        <ListItem
          title="اقامت"
          option={[
            { id: "1", href: "/hotel", title: "هتل" },
            { id: "2", href: "/accommodation", title: "اقامت" },
          ]}
        />
        <NavigationMenuItem
          aria-hidden
          className={`${driverClass} hidden md:block`}
        />
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/tour">تور</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem aria-hidden className={driverClass} />
        <ListItem
          title="بیشتر"
          option={[
            { id: "1", href: "/", title: "علی‌بابا پلاس" },
            { id: "3", href: "/", title: "مجله علی‌بابا" },
            { id: "4", href: "/", title: "بیمه مسافرتی" },
            { id: "5", href: "/", title: "سفر اقساطی" },
          ]}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
