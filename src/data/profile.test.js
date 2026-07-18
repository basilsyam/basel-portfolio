import {
  calculateAge,
  calculateExperienceYears,
} from "./profile";

describe("profile date calculations", () => {
  it("updates age after the birthday", () => {
    expect(
      calculateAge("2005-06-04", new Date("2026-06-04T12:00:00")),
    ).toBe(21);
  });

  it("keeps the previous age before the birthday", () => {
    expect(
      calculateAge("2005-06-04", new Date("2026-06-03T12:00:00")),
    ).toBe(20);
  });

  it("updates experience after each start-date anniversary", () => {
    expect(
      calculateExperienceYears(
        "2022-08-15",
        new Date("2026-08-14T12:00:00"),
      ),
    ).toBe(3);
    expect(
      calculateExperienceYears(
        "2022-08-15",
        new Date("2026-08-15T12:00:00"),
      ),
    ).toBe(4);
  });
});
