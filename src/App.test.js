import { navigationLinks } from "./config/site";

describe("application routes", () => {
  test("keeps the expected portfolio routes", () => {
    expect(navigationLinks.map(({ path }) => path)).toEqual([
      "/",
      "/about",
      "/services",
      "/projects",
      "/contact",
    ]);
  });

  test("does not contain duplicate paths or labels", () => {
    const paths = navigationLinks.map(({ path }) => path);
    const labels = navigationLinks.map(({ label }) => label);

    expect(new Set(paths).size).toBe(paths.length);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
