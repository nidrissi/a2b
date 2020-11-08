/** The main entry type.
 */
type Entry = {
    abstract: string | null,
    authors: Array<string>,
    comment: string | null,
    date: string,
    doi: string | null,
    id: string | null,
    journalRef: string | null,
    pdfLink: string | null,
    primaryCategory: string | null,
    pubstate: string | null,
    title: string,
    version: string | null
};

type Query = {
    authors: Array<string>,
    ids: Array<string>,
    titles: Array<string>
};

type QuerySettings = {
    maxResults: int,
    sortBy: string,
    sortOrder: string
}