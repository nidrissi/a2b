/** Converts accented characters into unaccented ones.
    arXiv does not allow searching for accents...
 */
export function removeAccents(s: string): string {
  // https://stackoverflow.com/a/37511463
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Splits a string and removes empty entries.
    @param str The string to be split.
    @param rx The regexp along which the string will be split.
 */
export function splitter(str: string, rx: RegExp): string[] {
  return str
    .split(rx)
    .map((s) => s.trim())
    .filter((s) => s !== "");
}
