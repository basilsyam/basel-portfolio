import { getBotResponse } from "./chatbot";

describe("getBotResponse", () => {
  test("answers English service questions", () => {
    expect(getBotResponse("What services do you offer?")).toContain(
      "Frontend Development"
    );
  });

  test("answers Arabic contact questions in Arabic", () => {
    expect(getBotResponse("كيف أتواصل مع باسل؟")).toContain(
      "يمكنك التواصل"
    );
  });

  test("returns a helpful fallback in the message language", () => {
    expect(getBotResponse("سؤال غير معروف")).toContain("أستطيع مساعدتك");
    expect(getBotResponse("unknown question")).toContain("I can help");
  });

  test("answers from the actual project data", () => {
    const response = getBotResponse("Tell me about Arabic Tetris");

    expect(response).toContain("Arabic Tetris Game");
    expect(response).toContain("Tailwind CSS");
  });

  test("answers from the actual profile data", () => {
    const response = getBotResponse("Who is Basel?");

    expect(response).toContain("Basel AbdAlqader Seyam");
    expect(response).toContain("Software Engineer");
  });
});
