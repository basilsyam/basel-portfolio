import { getContactErrorMessage, getEmailJsConfig } from "./contact";

describe("contact utilities", () => {
  test("returns EmailJS configuration only when every value exists", () => {
    expect(
      getEmailJsConfig({
        REACT_APP_EMAILJS_SERVICE_ID: "service",
        REACT_APP_EMAILJS_TEMPLATE_ID: "template",
        REACT_APP_EMAILJS_PUBLIC_KEY: "key",
      })
    ).toEqual({
      serviceId: "service",
      templateId: "template",
      publicKey: "key",
    });

    expect(getEmailJsConfig({ REACT_APP_EMAILJS_SERVICE_ID: "service" })).toBeNull();
  });

  test("normalizes EmailJS and network errors", () => {
    expect(getContactErrorMessage({ text: "EmailJS failed" })).toBe(
      "EmailJS failed"
    );
    expect(getContactErrorMessage(new Error("Network failed"))).toBe(
      "Network failed"
    );
    expect(getContactErrorMessage(null)).toContain("Please try again");
  });
});
