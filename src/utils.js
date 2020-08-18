/** Converts accented characters into unaccented ones.
    arXiv does not allow searching for accents...
 */
export function removeAccents(str) {
  // https://stackoverflow.com/a/37511463
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}
