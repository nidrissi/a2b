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
