function parseEntry(xmlEntry) {
  // the end result
  const entry = {};

  // authors
  entry.authors = []
  for (let a of xmlEntry.getElementsByTagName('author')) {
    entry.authors.push(a.textContent.trim())
  }

  // title
  entry.title = xmlEntry.getElementsByTagName('title').item(0).textContent.trim().replace(/\s+/gm, " ");

  // date
  entry.year = xmlEntry.getElementsByTagName('published').item(0).textContent.trim().substr(0, 4);

  // id
  // the URL has the form http://arxiv.org/abs/{id}v{version}
  // id can be of the form YYMM.ID (where I are numbers) or CLASS/ID
  const idURL = xmlEntry.getElementsByTagName('id').item(0).textContent.trim();
  const regex = /\/abs\/(?<id>[-a-z0-9.]+)v\d+/;
  const found = idURL.match(regex);
  entry.id = found.groups.id;

  // link to PDF
  for (let l of xmlEntry.getElementsByTagName('link')) {
    if (l.getAttribute('title') === 'pdf') {
      entry.pdfLink = l.getAttribute('href');
    }
  }

  return entry;
}

export async function arxivSearch(idList) {
  const escapedIdList = encodeURIComponent(idList.trim());
  const urlQuery = `https://export.arxiv.org/api/query?id_list=${escapedIdList}`;

  const response = await fetch(urlQuery);
  const xmlData = await response.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");
  const xmlEntries = xmlDoc.getElementsByTagName("entry");

  const entries = [];
  for (let w of xmlEntries) {
    entries.push(parseEntry(w));
  }

  return entries;
}
