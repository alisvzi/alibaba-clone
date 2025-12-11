"use client";

import { MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Select, {
  components,
  MenuProps,
  OptionProps,
  StylesConfig,
} from "react-select";

export type CityOption = { value: string; label: string; code: string };
const cities: CityOption[] = [
  { value: "THR", label: "تهران", code: "THR" },
  { value: "MHD", label: "مشهد", code: "MHD" },
  { value: "KIH", label: "کیش", code: "KIH" },
  { value: "SYZ", label: "شیراز", code: "SYZ" },
  { value: "ISF", label: "اصفهان", code: "ISF" },
  { value: "TBZ", label: "تبریز", code: "TBZ" },
  { value: "AWZ", label: "اهواز", code: "AWZ" },
  { value: "BND", label: "بندرعباس", code: "BND" },
  { value: "AZD", label: "یزد", code: "AZD" },
  { value: "KER", label: "کرمان", code: "KER" },
  { value: "RAS", label: "رشت", code: "RAS" },
  { value: "SRY", label: "ساری", code: "SRY" },
  { value: "ZBR", label: "چابهار", code: "ZBR" },
  { value: "GSM", label: "قشم", code: "GSM" },
  { value: "KSH", label: " کرمانشاه", code: "KSH" },
];

// Custom Option Component
const CustomOption = (props: OptionProps<CityOption>) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex flex-col text-right">
          <span className="font-bold text-gray-800 text-base">
            {props.data.label}
          </span>
          <span className="text-sm text-gray-500 mt-1">همه فرودگاه‌ها</span>
        </div>
        <span className="text-gray-500 text-sm font-mono bg-gray-100 px-2 py-1 rounded-md">
          {props.data.code}
        </span>
      </div>
    </components.Option>
  );
};

// Custom Menu Component for Animation
const CustomMenu = (props: MenuProps<CityOption>) => {
  return (
    <components.Menu
      {...props}
      className="animate__animated animate__fadeIn animate__faster overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      {props.children}
    </components.Menu>
  );
};

interface LocationSelectProps {
  label: string;
  placeholder?: string;
  onChange?: (val: CityOption | null) => void;
  value?: CityOption | null;
  icon?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  inputId?: string;
}

const LocationSelect = ({
  label,
  onChange,
  value,
  className,
  isOpen,
  onMenuOpen,
  onMenuClose,
  inputId,
}: LocationSelectProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const selectRef = useRef<any>(null);
  const isMenuOpen = isOpen !== undefined ? isOpen : internalIsOpen;

  useEffect(() => {
    if (isOpen) {
      setInternalIsOpen(true);
      setTimeout(() => {
        try {
          selectRef.current?.focus?.();
          selectRef.current?.openMenu?.();
        } catch {}
      }, 0);
    }
  }, [isOpen, inputId]);

  const handleMenuOpen = () => {
    if (onMenuOpen) onMenuOpen();
    setInternalIsOpen(true);
    setTimeout(() => {
      try {
        const el = inputId ? document.getElementById(inputId) : null;
        (el as HTMLInputElement | null)?.focus();
      } catch {}
    }, 0);
  };

  const handleMenuClose = () => {
    if (onMenuClose) onMenuClose();
    setInternalIsOpen(false);
  };

  const customStyles: StylesConfig<CityOption, false> = {
    control: (base) => ({
      ...base,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      minHeight: "100%",
      height: "100%",
      padding: 0,
      cursor: "pointer",
      alignItems: "center",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 4px",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
      minWidth: "320px",
      right: 0,
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      marginTop: "4px",
      padding: "8px 0",
      border: "none",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    input: (base) => ({
      ...base,
      color: "#4b5563", // gray-600
      fontWeight: 500,
      fontSize: "1.1rem",
      fontFamily: "inherit",
      margin: 0,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      display: "none", // Hide default placeholder
    }),
    singleValue: (base) => ({
      ...base,
      color: "#000",
      fontWeight: 700,
      fontSize: "1.2rem",
      margin: 0,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      display: "none", // Hide dropdown arrow
    }),
  };

  const hasValue = !!value;

  return (
    <div
      className={`relative h-full px-4 py-2 hover:bg-gray-100/50 transition-colors cursor-pointer flex flex-col justify-center overflow-visible ${className}`}
      onClick={() => !isMenuOpen && handleMenuOpen()}
    >
      {/* Floating Label */}
      <div
        className={`absolute pointer-events-none transition-all duration-200 ease-in-out z-10 flex items-center gap-1 ${
          hasValue || isMenuOpen
            ? "top-2 text-xs text-gray-500 font-medium translate-y-0"
            : "top-1/2 -translate-y-1/2 text-lg text-gray-500 font-bold"
        }`}
      >
        {!hasValue && !isMenuOpen && <MapPin className="w-5 h-5 opacity-50" />}
        <span>{label}</span>
      </div>

      <div
        className={`${
          hasValue || isMenuOpen ? "pt-4" : "opacity-0"
        } w-full h-full`}
      >
        <Select
          ref={selectRef}
          inputId={inputId}
          // Provide a stable instanceId so react-select generates deterministic ids
          // on server and client (avoids hydration mismatches for live-region/placeholder ids)
          instanceId={inputId ?? label}
          options={cities}
          value={value}
          onChange={(val) => {
            if (onChange) onChange(val);
            setInternalIsOpen(false);
          }}
          placeholder=""
          styles={customStyles}
          components={{
            Option: CustomOption,
            Menu: CustomMenu,
          }}
          isClearable={false}
          isSearchable={true}
          openMenuOnFocus={true}
          openMenuOnClick={true}
          closeMenuOnSelect={true}
          menuIsOpen={isMenuOpen}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          autoFocus={false}
          noOptionsMessage={() => "موردی یافت نشد"}
          loadingMessage={() => "در حال بارگذاری..."}
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : undefined
          }
          filterOption={(candidate, input) => {
            const text = (input || "").toString();
            const lbl = (candidate.label || "").toString();
            const code = (candidate.data?.code || "").toString();
            return lbl.includes(text) || code.includes(text);
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LocationSelect;
