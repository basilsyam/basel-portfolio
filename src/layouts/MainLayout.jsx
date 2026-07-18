import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageTransition from "../animation/PageTransition";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import { useLanguage } from "../context/LanguageContext";

const pageDetails = {
  "/": { labelKey: "pages.home", number: "01" },
  "/about": { labelKey: "pages.about", number: "02" },
  "/services": { labelKey: "pages.services", number: "03" },
  "/projects": { labelKey: "pages.projects", number: "04" },
  "/contact": { labelKey: "pages.contact", number: "05" },
};

const MainLayout = () => {
  const location = useLocation();
  const hasMounted = useRef(false);
  const { t } = useLanguage();
  const currentPage = pageDetails[location.pathname] || pageDetails["/"];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  const isInitialLoad = !hasMounted.current;

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return (
    <>
      <Navbar />

      <PageTransition
        key={location.pathname}
        isInitialLoad={isInitialLoad}
        pageLabel={t(currentPage.labelKey)}
        pageNumber={currentPage.number}
      >
        <Suspense
          fallback={
            <div
              className="page-loader"
              role="status"
              aria-label={t("common.loading")}
            >
              <span />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </PageTransition>

      <Footer />
      <Chatbot />
    </>
  );
};

export default MainLayout;
