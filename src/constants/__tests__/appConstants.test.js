import { APP_TITLE } from "../appConstants";

describe("appConstants", () => {
  it("APP_TITLE is exactly Tennessee Driver Practice Test", () => {
    expect(APP_TITLE).toBe("Tennessee Driver Practice Test");
  });

  it("APP_TITLE does not contain old KY-DL branding", () => {
    expect(APP_TITLE).not.toMatch(/KY[-\s]?DL/i);
    expect(APP_TITLE).not.toMatch(/\bKY\b/i);
  });
});