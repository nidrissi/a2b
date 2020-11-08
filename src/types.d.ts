/** The main entry type. */
type Entry = {
    authors: string[],
    date: string,
    type: string,
    abstract?: string,
    comment?: string,
    doi?: string,
    id?: string,
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
    pubstate?: string,
    series?: string,
    subTitle?: string,
    title?: string,
    version?: number,
    volume?: number,
};

/** An arXiv query as built by SearchForm */
type Query = {
    authors: string[],
    ids: string[],
    titles: string[],
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
    maxResults: number,
};
