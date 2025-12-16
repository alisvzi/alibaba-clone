"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function HeaderPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("header-portal-root");
    if (!el) return;

    setTimeout(() => {
      setContainer(el);
    }, 0);
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}
