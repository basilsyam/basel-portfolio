import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageTransition from "../animation/PageTransition";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";

const pageDetails = {
  "/": { label: "Home", number: "01" },
  "/about": { label: "About", number: "02" },
  "/services": { label: "Services", number: "03" },
  "/projects": { label: "Projects", number: "04" },
  "/contact": { label: "Contact", number: "05" },
};

const MainLayout = () => {
  const location = useLocation();
  const hasMounted = useRef(false);
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
        pageLabel={currentPage.label}
        pageNumber={currentPage.number}
      >
        <Suspense
          fallback={
            <div
              className="page-loader"
              role="status"
              aria-label="Loading page"
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
