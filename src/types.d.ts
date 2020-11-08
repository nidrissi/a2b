/** The main entry type. */
type Entry = {
    abstract?: string,
    authors: Array<string>,
    comment?: string,
    date: string,
    doi: string,
    id: string,
    issue?: number,
    ISBN?: string,
    journal?: string,
    journalRef?: string,
    location?: string,
    mainTitle?: string,
    number?: string,
    pageTotal?: string,
    pdfLink?: string,
    primaryCategory?: string,
    publisher?: string,
    pubstate: string,
    series?: string,
    subTitle?: string,
    title: string,
    type: string,
    version?: number,
    volume?: number,
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
