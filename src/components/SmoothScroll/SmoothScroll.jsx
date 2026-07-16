import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let lenis = null;

    const createLenis = () => {
      // تنظيف النسخة السابقة إن وجدت
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }

      // استخدام التمرير الطبيعي عند تقليل الحركة
      if (reducedMotionQuery.matches) {
        return;
      }

      lenis = new Lenis({
        autoRaf: true,

        duration: 1.05,

        smoothWheel: true,

        wheelMultiplier: 0.9,

        // نحافظ على اللمس الطبيعي في الجوال
        syncTouch: false,

        touchMultiplier: 1,

        // تفعيل روابط #about و #projects
        anchors: true,
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

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      reducedMotionQuery.removeEventListener(
        "change",
        createLenis
      );

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