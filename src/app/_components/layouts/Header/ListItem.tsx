import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const ListItem = ({
  title,
  option,
}: React.ComponentPropsWithoutRef<"li"> & {
  title: string;
  option: { id: string; title: string; href: string }[];
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[200px] gap-4">
          <li>
            {option.map((item) => (
              <NavigationMenuLink asChild key={item.id}>
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ListItem;
