import { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import {
  pageLoaders,
  prefetchAllPages,
} from "./config/pageLoaders";

const About = lazy(pageLoaders["/about"]);
const Services = lazy(pageLoaders["/services"]);
const Projects = lazy(pageLoaders["/projects"]);
const Contact = lazy(pageLoaders["/contact"]);

const App = () => {
  useEffect(() => {
    let idleCallbackId;
    let timeoutId;

    if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(prefetchAllPages, {
        timeout: 2500,
      });
    } else {
      timeoutId = window.setTimeout(prefetchAllPages, 1200);
    }

    return () => {
      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
