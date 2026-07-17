export const pageLoaders = {
  "/about": () => import("../pages/About"),
  "/services": () => import("../pages/Services"),
  "/projects": () => import("../pages/Projects"),
  "/contact": () => import("../pages/Contact"),
};

const prefetchedPages = new Set();

export const prefetchPage = (path) => {
  const loader = pageLoaders[path];

  if (!loader || prefetchedPages.has(path)) return;

  prefetchedPages.add(path);
  loader().catch(() => {
    prefetchedPages.delete(path);
  });
};

export const prefetchAllPages = () => {
  Object.keys(pageLoaders).forEach(prefetchPage);
};
