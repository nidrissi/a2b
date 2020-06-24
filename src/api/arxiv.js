const fakeXML = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <link href="http://arxiv.org/api/query?search_query%3Did%3A1911.12281%26id_list%3D%26start%3D0%26max_results%3D10" rel="self" type="application/atom+xml"/>
  <title type="html">ArXiv Query: search_query=id:1911.12281&amp;id_list=&amp;start=0&amp;max_results=10</title>
  <id>http://arxiv.org/api/ltEowUrxgsgaDoe1LZL0ZLw63Jc</id>
  <updated>2020-06-24T00:00:00-04:00</updated>
  <opensearch:totalResults xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">1</opensearch:totalResults>
  <opensearch:startIndex xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">0</opensearch:startIndex>
  <opensearch:itemsPerPage xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">10</opensearch:itemsPerPage>
  <entry>
    <id>http://arxiv.org/abs/1911.12281v2</id>
    <updated>2020-04-02T15:26:49Z</updated>
    <published>2019-11-27T16:52:52Z</published>
    <title>Configuration Spaces of Surfaces</title>
    <summary>
      We compute small rational models for configuration spaces of points on
      oriented surfaces, as right modules over the framed little disks operad. We do
      this by splitting these surfaces in unions of several handles. We first
      describe rational models for the configuration spaces of these handles as
      algebras in the category of right modules over the framed little disks operad.
      We then express the configuration spaces of the surface as an "iterated
      Hochschild complex" of these algebras with coefficients in the module given by
      configurations in a sphere with holes.
      Physically, our results may be interpreted as saying that the partition
      function of the Poisson-$\\sigma$-model on closed surfaces has no quantum
      corrections, i.e., no terms coming from Feynman diagrams of positive loop
      order.
    </summary>
    <author>
      <name>Ricardo Campos</name>
    </author>
    <author>
      <name>Najib Idrissi</name>
    </author>
    <author>
      <name>Thomas Willwacher</name>
    </author>
    <arxiv:comment xmlns:arxiv="http://arxiv.org/schemas/atom">50 pages. v2: fixed typos</arxiv:comment>
    <link href="http://arxiv.org/abs/1911.12281v2" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/1911.12281v2" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="math.QA" scheme="http://arxiv.org/schemas/atom"/>
    <category term="math.QA" scheme="http://arxiv.org/schemas/atom"/>
    <category term="math.AT" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
</feed>
`;

// const fakeEntries = [
//   { id: 12345, authors: ['Dr. X', 'Dr. Y'], year: 2020, title: 'Theory of Z' },
//   { id: 123456, authors: ['A. Laurel', 'B. Hardy'], year: 1975, title: 'Greatest Hits' }
// ];

function parseEntry(xmlEntry) {
  // the end result
  const entry = {};

  // authors
  entry.authors = []
  for (let a of xmlEntry.getElementsByTagName('author')) {
    entry.authors.push(a.textContent.trim())
  }

  // title
  entry.title = xmlEntry.getElementsByTagName('title').item(0).textContent.trim();

  // date
  entry.year = xmlEntry.getElementsByTagName('published').item(0).textContent.trim().substr(0,4);

  // id
  // the URL has the form http://arxiv.org/abs/{id}v{version}
  // id can be of the form YYMM.ID (where I are numbers) or CLASS/ID
  const idURL = xmlEntry.getElementsByTagName('id').item(0).textContent.trim();
  const regex = /\/abs\/(?<id>[-a-z0-9.]+)v\d+/;
  const found = idURL.match(regex);
  entry.id = found.groups.id;

  return entry;
}

export function arxivSearch(id) {
  const xmlData = fakeXML; // fetch TODO
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");
  const xmlEntries = xmlDoc.getElementsByTagName("entry");
  const entries = [];
  for (let w of xmlEntries) {
    entries.push(parseEntry(w));
  }
  return entries;
}
