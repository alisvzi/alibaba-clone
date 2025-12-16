"use client";

import { cn } from "@/lib/utils";

type SearchButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
  className?: string;
};

const SearchButton = ({
  onClick,
  disabled,
  isLoading,
  label = "جستجو",
  loadingLabel = "در حال انتقال...",
  className,
}: SearchButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "w-full lg:w-auto h-full min-h-10 px-10 rounded-lg flex items-center justify-center gap-3 transition-colors whitespace-nowrap",
        isLoading
          ? "bg-brand text-brand-foreground"
          : "bg-brand hover:bg-brand/90 text-brand-foreground",
        isLoading && "cursor-wait",
        className
      )}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
      ) : (
        <></>
      )}
      {isLoading ? loadingLabel : label}
    </button>
  );
};

export default SearchButton;
