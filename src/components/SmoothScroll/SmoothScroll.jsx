import { useEffect } from "react";
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
    let idleCallbackId;
    let loadTimerId;
    let initializationVersion = 0;
    let isUnmounted = false;

    const createLenis = async () => {
      const currentVersion = ++initializationVersion;

      // تنظيف النسخة السابقة إن وجدت
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }

      // Native scrolling is faster and more predictable on touch devices.
      if (reducedMotionQuery.matches || mobileQuery.matches) {
        return;
      }

      const { default: Lenis } = await import("lenis");

      if (
        isUnmounted ||
        currentVersion !== initializationVersion ||
        reducedMotionQuery.matches ||
        mobileQuery.matches
      ) {
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

    const scheduleLenis = () => {
      loadTimerId = window.setTimeout(() => {
        if (isUnmounted) return;

        if ("requestIdleCallback" in window) {
          idleCallbackId = window.requestIdleCallback(createLenis, {
            timeout: 2000,
          });
        } else {
          createLenis();
        }
      }, 700);
    };

    const handleVisibilityChange = () => {
      if (!lenis) return;

      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    if (document.readyState === "complete") {
      scheduleLenis();
    } else {
      window.addEventListener("load", scheduleLenis, { once: true });
    }

    reducedMotionQuery.addEventListener("change", createLenis);
    mobileQuery.addEventListener("change", createLenis);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      isUnmounted = true;
      initializationVersion += 1;
      window.removeEventListener("load", scheduleLenis);
      window.clearTimeout(loadTimerId);
      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }
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
