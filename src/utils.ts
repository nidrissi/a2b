/** Converts accented characters into unaccented ones.
    arXiv does not allow searching for accents...
 */
export function removeAccents(s: string) {
  // https://stackoverflow.com/a/37511463
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
