import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const mobileQuery = window.matchMedia(
      "(max-width: 768px), (pointer: coarse)"
    );

    let lenis = null;

    const createLenis = () => {
      // تنظيف النسخة السابقة إن وجدت
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }

      // Native scrolling is faster and more predictable on touch devices.
      if (reducedMotionQuery.matches || mobileQuery.matches) {
        return;
      }

      lenis = new Lenis({
        autoRaf: true,

        duration: 0.72,

        smoothWheel: true,

        wheelMultiplier: 1,

        // نحافظ على اللمس الطبيعي في الجوال
        syncTouch: false,

        touchMultiplier: 1,

        // HashRouter owns URLs such as #/services. Lenis must not treat them
        // as in-page element selectors.
        anchors: false,
      });
    };

    const handleVisibilityChange = () => {
      if (!lenis) return;

      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    createLenis();

    reducedMotionQuery.addEventListener("change", createLenis);
    mobileQuery.addEventListener("change", createLenis);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      reducedMotionQuery.removeEventListener(
        "change",
        createLenis
      );
      mobileQuery.removeEventListener("change", createLenis);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
