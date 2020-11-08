import React from 'react';

export type FAQEntryProps = { myKey: string, q: string | JSX.Element, a: string | JSX.Element };
export type FAQSectionProps = { title: string, key: string, entries: Array<FAQEntryProps> };
const faq: Array<FAQSectionProps> = [
  {
    title: 'This program',
    key: 'program',
    entries: [
      {
        myKey: 'what',
        q: 'What (is this)?',
        a: <>This program fetches entries from the <a href="https://arxiv.org">arXiv</a> and formats them to be used with <a href="https://www.ctan.org/pkg/biblatex">BibLaTeX</a>.</>
      },
      {
        myKey: 'who',
        q: 'Who (wrote it)?',
        a: <>I am <a href="https://idrissi.eu">Najib Idrissi</a>, a mathematician.</>
      },
      {
        myKey: 'why',
        q: 'Why (did you write this)?',
        a: <>There are several programs around for making a Bib(La)Tex entry out of an arXiv entry. However, all the ones I found have issues: URLs are displayed twice, author names are not handled correctly (see below), no BibLaTeX support, “arXiv” in the journal field where it doesn’t belong, etc. I had been using a <a href="https://github.com/nidrissi/dotfiles/blob/master/local/bin/arxiv.pl">homemade Perl script</a> for a long time, but it lacked some features and not as easily usable. So, I wrote this.</>
      },
      {
        myKey: 'how',
        q: 'How (does it work)?',
        a: <>It is mainly written in JavaScript, using React, Redux (+ React Redux & Redux Toolkit), React Router, the Bootstrap framework, and FontAwesome for the icons.</>
      },
      {
        myKey: 'where',
        q: 'Where (is it hosted)?',
        a: 'This website is currently hosted on Amazon Web Services (S3 + CloudFront), which costs me a few cents per month. The source is hosted on GitHub and the website is automatically built and uploaded to S3 using GitHub actions, which is free.'
      },
      {
        myKey: 'license',
        q: "What license is this program?",
        a: <>
             This program is free software: you can redistribute it and/or modify it under the terms of the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU Affero General Public License</a> as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
             <br />
             The source code is <a href="https://github.com/nidrissi/a2b">available on GitHub</a>.
           </>
      },
      {
        myKey: 'work',
        q: 'Does it work?',
        a: <>
             I guess it does, however it is in a preliminary state. There is little error checking in the code, and no tests. In the words of the AGPLv3:
             <br />
             This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
           </>
      },
      {
        myKey: 'bug',
        q: 'I found a bug!',
        a: <>Please <a href="https://github.com/nidrissi/a2b/issues">report an issue on Github</a> (or contact me by email). I cannot really promise anything, though.</>
      },
    ],
  },
  {
    title: 'Search',
    key: 'search',
    entries: [
      {
        myKey: 'api',
        q: 'How do you find entries?',
        a: <>I use the <a href="https://arxiv.org/help/api/index">arXiv API</a> to fetch entries. This program is essentially a glorified URL query constructor and XML parser.</>
      },
      {
        myKey: 'andor',
        q: 'What are the conditions for an entry to be displayed?',
        a: <>An entry will appear in the search results if it matches <em>all</em> the conditions inputted in the search form. It is theoretically possible to build more complex search queries using the API, but this would require revamping the form. Feel free to <a href="https://github.com/nidrissi/a2b/issues">suggest changes</a> if you have an idea on how to do that nicely, and/or <a href="https://github.com/nidrissi/a2b/pulls">contribute to the code</a> ☺.</>
      },
      {
        myKey: 'accents',
        q: 'I cannot find entries with special characters',
        a: <>It appears that the API does not allow searching for entries with non-ASCII characters: for example, to find a paper by Poincaré paper, you would have to search for "Henri Poincare". I use a <a href="https://stackoverflow.com/a/37511463">trick</a> to remove accents from all characters, but there are probably many edge cases that I did not deal with.</>
      },
    ],
  },
  {
    title: 'Output',
    key: 'output',
    entries: [
      {
        myKey: 'format',
        q: 'What format is the output?',
        a: <>
             The output is formatted to be used with <a href="https://www.ctan.org/pkg/biblatex">BibLaTeX</a>. BibLaTeX is a more modern approach to bibliography than LaTeX's default bibliography support – which has not been developed much since the end of the 20th century – and has many advantages. Among other things, its database format is well-defined, as opposed to the default format, where a field can have different meanings depending on the chosen style (the <code>.bst</code> file that you choose with <code>\bibliographystyle</code>). It is able to accurately represent an arXiv entry, while the default styles cannot. It also support well languages other than English.
           </>
      },
      {
        myKey: 'difference',
        q: 'What is the difference between BibLaTeX, natbib, Biber, BibTeX...?',
        a: <>
             BibLaTeX is a LaTeX package used to format bibliography. Its “original” counterpart was the <code>\bibliography</code> / <code>\printbibliography</code> in standard LaTeX, the <code>thebibliography</code> environment, or packages such as <code>natbib</code>. BibLaTeX is much more powerful than the original LaTeX bibliography system, see <a href="https://www.ctan.org/pkg/biblatex">its website</a> for more information.
             <br />
             BibTeX and Biber are two external programs that convert a <code>.bib</code> file into a <code>.bbl</code> file readable by LaTeX. One of the main advantages of Biber over BibTeX is its support of Unicode characters. <a href="https://tex.stackexchange.com/q/25701/14965">Read more about this on TeX.SE.</a>
           </>
      },
      {
        myKey: 'usual',
        q: 'But I want to use the old bibliography packages!',
        a: <>This program has a legacy BibTeX mode. However, the required format for the entry heavily depends on the chosen <code>.bst</code> style. Default styles do not support URLs, DOIs, eprints, etc. Out of those that do, most do not support all of them. Please make sure that the entry produced is compatible with your style. <a href="https://arxiv.org/help/hypertex/bibstyles">Check also arXiv's official help</a>, but from its content it is clear that it was at least one or two decades ago.</>
      },
      {
        myKey: 'compile-arxiv',
        q: 'How do I submit an article using BibLaTeX to arXiv? I always get errors…',
        a: <>
             There are two issues that make it more difficult than it should be:
             <ul className="mb-0">
               <li>ArXiv is not very diligent when it comes to updating their TeX distribution. As of July 2020, they are nominally using TeX Live 2016, but <a href="https://arxiv.org/new/#feb-2017">they installed it in February 2017</a> and as such their distribution contains BibLaTeX v3.7, which is found in the historic archives of TeX Live 2017. The current version of BibLaTeX is v3.15a (in September 2020).</li>
               <li>ArXiv <a href="https://arxiv.org/help/submit_tex#bibtex">refuses</a> to compile <code>.bib</code> files with Biber or BibTeX. They require authors to send their compiled <code>.bbl</code> file. Unfortunately, files compiled for a newer version of BibLaTeX are not compatible with old versions. BibTeX has not been updated for decades so this is not an issue, but BibLaTeX is under active development.</li>
             </ul>
             There are several ways to solve this, <a href="https://github.com/plk/biblatex/wiki/biblatex-and-the-arXiv">as explained in the BibLaTeX development wiki</a>. The simplest one, in my opinion, is to install TeX Live 2017 from the <a href="https://tug.org/historic/">historic archives</a> and compile your article with the old binaries before sending the <code>.bbl</code> to arXiv.
           </>
      },
    ],
  },
  {
    title: 'Common problems & manual interventions',
    key: 'problems',
    entries: [
      {
        myKey: 'surnames',
        q: 'How does the program handle surnames?',
        a: <>
             ArXiv stores author names as e.g. “Jane H. Doe.” However, BibLaTeX expects surnames to be separated from given names, e.g. “Doe, Jane H.” This allows it to make special formatting of names, for example by automatically abbreviating given names (“J. H. Doe”) or capitalizing surnames in some styles (e.g. in French: “Jane H. Dᴏᴇ”).
             <br />
             To deal with this, I made a very simple and sometimes wrong assumption: the last word in a name is the surname, everything else is the given name. I am aware that this fails in a few cases, for example:
             <ul className="mb-0">
               <li>when people have two or more surname, e.g. my own full name, “Najib Idrissi Kaïtouni”... or for example in many Spanish names;</li>
               <li>when there is an addendum such as “John Doe, <em>Jr.</em>", “Jean <em>de la</em> Fontaine” or “Vincent <em>van</em> Gogh.”</li>
             </ul>
             Due to the large number of possible variations, it is not possible to automatically deal with this issue and it must be fixed by hand every time. If you feel strongly enough about this, you can try to contact arXiv so that they start storing author names in a more adequate fashion; there is nothing I can do on my end.
           </>
      },
      {
        myKey: 'pubstate',
        q: <>What is <code>pubstate</code>?</>,
        a: <>In BibLaTeX, it indicates the publication state of the entry. For a preprint, the correct value is <code>prepublished</code>. Other possible values include <code>submitted</code>, <code>forthcoming</code>, <code>inpress</code>, and so on (see the BibLaTeX manual). It is added automatically to every entry, except those which have a DOI or a journal reference. Note that the author may have forgotten to update these fields after publication, so the value may be wrong: if the paper is already published, update or remove <code>pubstate</code> as appropriate.</>,
      },
      {
        myKey: 'howpublished',
        q: <>What is <code>howpublished</code>?</>,
        a: <>In BibLaTeX, this denotes a free-form field that indicates how an entry was published. It is populated with the journal reference if present in arXiv. Consider converting entries with a journal reference to a more appropriate entry type such as <code>@article</code>, <code>@book</code>, <code>@inproceedings</code>…</>
      },
      {
        myKey: 'comment',
        q: <>What is <code>comment</code>?</>,
        a: <>
             This field is populated from the comment left by the author(s) on arXiv. It is meaningless to BibLaTeX and will not be rendered in the bibliographical entry. Do not confuse it with <code>note</code>, which displays a free-form note at the end of the bibliographical entry.
             <br/>
             It sometimes contains information that should go in other fields:
             <ul>
               <li>“XX pages”: should go in the <code>pagetotal</code> field (used by default for <code>@book</code> entries only, other types requires special configuration);</li>
               <li>“to appear in J. XYZ”: convert the entry to <code>@article</code>, put the journal in <code>journaltitle</code>, and set <code>pubstate</code> to <code>forthcoming</code>;</li>
               <li>other: consider adding them to the <code>note</code> field – which will be rendered into the bibliographical entry – if relevant.</li>
             </ul>
             
           </>
      },
      {
        myKey: 'capitals',
        q: 'Do you deal with capital letters?',
        a: <>
             No. If a title contains a letter that should always be kept capitalized (e.g. at the beginning of a proper noun), then you should add braces around that letter. This should not be done for <em>every</em> capital letter in the title. Indeed, in some styles/languages, titles must follow “title case” (titles look like “A Theory of Everything and Beyond”), but in other styles/languages they must <em>not</em> follow it (e.g. in French titles must look like “Théorie du tout et du reste”). BibLaTeX already handles this automatically; don't force its hand. It is not possible to automatically know if a word is a proper noun or not, so this must be dealt with manually.
             <br/>
             <em>Remark</em>: if you want a word to keep its capitalization, you should enclose the whole words in curly brackets, not just the first letter. Enclosing the first letter only breaks the automatic <a href="https://en.wikipedia.org/wiki/Kerning">kerning</a>. See BibLaTeX’s documentation for more details.
           </>
      },
      {
        myKey: 'math',
        q: 'Do you deal with math?',
        a: <>In titles, everything between a pair of dollar signs is enclosed by braces: <code>$...$</code> becomes <code>{'{$...$}'}</code>. This is relatively crude and may require manual intervention.</>
      },
    ],
  }
];
export default faq;
