"use client";

import Image from "next/image";
import { useState } from "react";

interface AirlineLogoImageProps {
  src: string | undefined;
  alt: string;
  defaultSrc?: string;
}

export default function AirlineLogoImage({
  src,
  alt,
  defaultSrc = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgcnk9IjQiIGZpbGw9IiM5Q0EzQUYiLz48cGF0aCBkPSJNMjEgMTZ2LTJsLTgtNVYzLjVhMS41IDEuNSAwIDAgMC0zIDBWOUwyIDE0djJsOC0yLjVWMTlsLTIgMS41VjIybDMtMSAzIDF2LTEuNUwxMyAxOXYtNS41bDggMi41eiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==",
}: AirlineLogoImageProps) {
  const [logoSrc, setLogoSrc] = useState(src || defaultSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setLogoSrc(defaultSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={40}
      height={40}
      onError={handleError}
      unoptimized={logoSrc.startsWith("data:")}
      className="rounded-lg object-contain text-[1px]"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    />
  );
}
