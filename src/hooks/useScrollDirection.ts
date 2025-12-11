import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // Show header when scrolling up or at top
      if (scrollDelta < -10 || currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide header when scrolling down past threshold
      else if (scrollDelta > 10 && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [lastScrollY]);

  return isVisible;
}
