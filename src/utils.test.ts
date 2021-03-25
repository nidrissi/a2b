import { removeAccents, splitter } from "./utils";

describe("removeAccents", () => {
  it("doesn't change strings without accents", () => {
    expect(removeAccents("bonjour")).toEqual("bonjour");
    expect(removeAccents("au revoir")).toEqual("au revoir");
    expect(removeAccents("'[]/!{}()?")).toEqual("'[]/!{}()?");
  });

  it("removes accents", () => {
    expect(removeAccents("éèàù")).toEqual("eeau");
    expect(removeAccents("ç")).toEqual("c");
  });
});

describe("splitter", () => {
  it("splits along &", () => {
    expect(splitter("bonjour & au revoir", /&/)).toEqual([
      "bonjour",
      "au revoir",
    ]);
  });

  it("splits along spaces", () => {
    expect(splitter("bonjour     au\trevoir", /\s+/)).toEqual([
      "bonjour",
      "au",
      "revoir",
    ]);
  });

  it("removes empty parts", () => {
    expect(splitter("bonjour & & au revoir", /&/)).toEqual([
      "bonjour",
      "au revoir",
    ]);
  });
});
