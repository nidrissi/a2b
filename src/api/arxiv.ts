// see https://arxiv.org/help/api/user-manual
import { removeAccents } from '../utils';

function getUniqueNamedTag(xmlEntry: Element | Document, tag: string): string {
  const collection = xmlEntry.getElementsByTagName(tag);
  const item = collection.item(0);
  if (item === null) {
    throw Error('no such named tag');
  }
  return item.textContent!.trim();
}

function parseEntry(xmlEntry: Element): Entry | null {
  // the end result
  const entry: Entry = {
    abstract: '',
    authors: [],
    comment: '',
    date: '',
    doi: '',
    id: '',
    journalRef: '',
    pdfLink: '',
    primaryCategory: '',
    pubstate: '',
    title: '',
    type: '',
    version: ''
  };

  // authors are of the form <author> <name>John Doe</name> (<arxiv:affiliation>University </arxiv.affiliation>)? </author>
  for (let a of Array.from(xmlEntry.getElementsByTagName('author'))) {
    entry.authors.push(getUniqueNamedTag(a, 'name'));
  };


  // title
  try {
    entry.title =
      getUniqueNamedTag(xmlEntry, 'title')
        .replace(/\s+/gm, " ")
        .replace(/\$([^$]+)\$/g, '{$$$1$$}') // deal with latex in title
  } catch (err) {
    // With id_list, if there is no entry for a given id, arXiv
    // returns a malformed empty entry instead of an error.
    // No, it doesn't make any sense.
    return null
  }

  // date
  entry.date = getUniqueNamedTag(xmlEntry, 'published').substr(0, 4); // only take the year

  // abstract
  entry.abstract = getUniqueNamedTag(xmlEntry, 'summary')

  // id
  const idURL = getUniqueNamedTag(xmlEntry, 'id');
  // the URL has the form http://arxiv.org/abs/{id}v{version}
  const regex = /arxiv\.org\/abs\/(.+)v(\d+)/;
  const match = idURL.match(regex);
  if (match === null) {
    throw Error('malformed arXiv URL');
  }
  const [id, version] = match;
  entry.id = id;
  entry.version = version;

  // link to PDF
  for (let l of Array.from(xmlEntry.getElementsByTagName('link'))) {
    if (l.getAttribute('title') === 'pdf') {
      entry.pdfLink = l.getAttribute('href');
    } else if (l.getAttribute('title') === 'doi') {
      entry.doi = l.getAttribute('href')!.replace('http://dx.doi.org/', '')
    }
  }

  // comment & journal ref (may not exist)
  try {
    entry.comment = getUniqueNamedTag(xmlEntry, 'arxiv:comment').replace(/\s+/g, ' ');
  } catch (_err) { }
  try {
    entry.journalRef = getUniqueNamedTag(xmlEntry, 'arxiv:journal_ref').replace(/\s+/g, ' ');
  } catch (_err) { }
  try {
    entry.primaryCategory = xmlEntry.getElementsByTagName('arxiv:primary_category').item(0)!.getAttribute('term');
  } catch (_err) { }

  // publication state
  if (!entry.doi && !entry.journalRef) {
    entry.pubstate = 'prepublished'
  }

  return entry;
}

/** If there is an error, arXiv returns a single error entry.
    In this case we just throw the error for fetchEntries to deal with.
 */
function checkEntryForErrors(xmlEntry: Element): void {
  for (let l of Array.from(xmlEntry.getElementsByTagName('link'))) {
    if (l.getAttribute('href')!.match('api/errors')) {
      const error = getUniqueNamedTag(xmlEntry, 'summary');
      throw (Error(`ArXiv reported: “${error}”.`));
    }
  }
}

function buildSearchQueryPart(list: Array<string>, label: string): string {
  let result = '';
  if (list.length > 0) {
    result = list.map(removeAccents).map(encodeURIComponent).map(a => `${label}:"${a}"`).join('+AND+');
  }
  return result;
}

function buildURLQuery(
  { authors, ids, titles }: Query,
  { maxResults, sortBy, sortOrder }: Settings
): string {
  const base: string = 'https://export.arxiv.org/api/query?';

  let idQuery = '';
  if (ids.length > 0) {
    idQuery = ';id_list=' + encodeURIComponent(ids.join(',').replace(/v\d+$/, ''))
  }

  const searchQuery = [
    buildSearchQueryPart(authors, 'au'),
    buildSearchQueryPart(titles, 'ti')
  ].filter(s => s.length > 0).join('+AND+');
  const searchSettings = `sortBy=${sortBy}&sortOrder=${sortOrder}&max_results=${maxResults}`;
  const fullSearchQuery = `search_query=${searchQuery}&${searchSettings}`;

  return base + fullSearchQuery + idQuery;
}

export async function arxivSearch(
  query: Query,
  settings: Settings
): Promise<{ entries: Array<Entry>, totalEntriesFound: number }> {
  const urlQuery = buildURLQuery(query, settings);
  const response = await fetch(urlQuery);
  const xmlData = await response.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");

  const xmlEntries = xmlDoc.getElementsByTagName("entry");
  const entries = [];
  for (let w of Array.from(xmlEntries)) {
    checkEntryForErrors(w);
    const parsedEntry = parseEntry(w);
    if (parsedEntry !== null) {
      entries.push(parsedEntry);
    }
  }

  const totalEntriesFound = parseInt(getUniqueNamedTag(xmlDoc, 'opensearch:totalResults'));

  return { entries, totalEntriesFound };
}
