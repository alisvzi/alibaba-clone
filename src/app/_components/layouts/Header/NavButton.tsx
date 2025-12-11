import React from "react";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ title, icon, ...props }) => {
  const classes =
    "cursor-pointer text-sm font-medium flex gap-1 items-center px-2 py-2 text-gray-700 transition ease-in-out hover:bg-muted active:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] rounded-lg whitespace-nowrap";

  return (
    <button className={classes} {...props}>
      {icon && <span>{icon}</span>}
      {title}
    </button>
  );
};

export default NavButton;
