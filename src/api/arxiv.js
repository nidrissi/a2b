const fakeEntries = [
  { id: 12345, authors: ['Dr. X', 'Dr. Y'], year: 2020, title: 'Theory of Z' },
  { id: 123456, authors: ['A. Laurel', 'B. Hardy'], year: 1975, title: 'Greatest Hits' }
]

export function arxivSearch(id) {
  console.log(id);
  return fakeEntries;
}
