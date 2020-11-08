/** The main entry type. */
type Entry = {
    abstract: string | null,
    authors: Array<string>,
    comment: string | null,
    date: string,
    doi: string | null,
    id: string | null,
    ISBN?: string,
    journal?: string,
    journalRef: string | null,
    location?: string,
    mainTitle?: string,
    number?: string,
    pageTotal?: string,
    pdfLink: string | null,
    primaryCategory: string | null,
    publisher?: string,
    pubstate: string | null,
    series?: string,
    subTitle?: string,
    title: string,
    type: string,
    version: string | null,
    volume?: string,
};

/** An arXiv query as built by SearchForm */
type Query = {
    authors: Array<string>,
    ids: Array<string>,
    titles: Array<string>
};

/** The settings */
type Settings = {
    mode: string,
    includeAbstract: boolean,
    includeFile: boolen,
    filePrefix: boolean,
    includeWget: boolean,
    fileFolder: string,
    includePrimaryCategory: boolean,
    includeVersion: boolean,
    sortBy: string,
    sortOrder: string,
    maxResults: number
};

type SearchInput = {
    ids: string[],
    authors: string[],
    titles: string[]
  }
