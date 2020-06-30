import React from 'react';

const faq = [
  { title: "This program",
    entries: [
      ['What (is this)?',
       <span>This program fetches entries from the <a href="https://arxiv.org">arXiv</a> and formats them to be used with BibLaTeX.</span>],
      ['Who (wrote it)?',
       <span>I am <a href="https://idrissi.eu">Najib Idrissi</a>, a mathematician.</span>],
      ['Why (did you write this)?',
       'There are several programs around for making a bib(la)tex entry out of an arXiv preprint. However, all the ones I found have issues: URLs are displayed twice, author names are not handled correctly (see below), no biblatex support, “arXiv” in the journal field where it doesn\'t belong, etc. I had been using a homemade Perl script for a long time, but it lacked some features and not as easily usable. So, I wrote this.'],
      ['How (does it work)?',
       <span>It's mainly written in JavaScript, using React, Redux (+ React Redux & Redux Toolkit), React Router, the Bootstrap framework, and FontAwesome for the icons. It uses the <a href="https://arxiv.org/help/api/index">arXiv API</a> (with all its quirks…) to fetch entries.</span>],
      ['What license is this program?',
       <span>
         This program is free software: you can redistribute it and/or modify it under the terms of the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU Affero General Public License</a> as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
         <br />
         The source code is <a href="https://github.com/nidrissi/arxiv2bib">available on GitHub</a>.
       </span>],
      ['Does it work?',
       <span>
         I guess it does, however it is in a preliminary state. There is little error checking in the code, and no tests. In the words of the AGPLv3:
         <br />
         This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
       </span>],
      ['I found a bug!',
       <span>Please <a href="https://github.com/nidrissi/arxiv2bib/issues">report an issue on Github</a> (or contact me by email). I cannot really promise anything, though.</span>],
    ],
  },
  { title: "Output",
    entries: [
      ['What format is the output?',
       <span>
         The output is formatted to be used with <a href="https://www.ctan.org/pkg/biblatex">BibLaTeX</a>. BibLaTeX is a more modern approach to bibliography than LaTeX's default bibliography support and has many advantages over it. In particular, its database format is well-defined, as opposed to the default format, where a field can have different meanings depending on the chosen style (the <code>.bst</code> file that you choose with <code>\bibliographystyle</code>). It is able to accurately represent an arXiv entry, while the default styles cannot.
       </span>],
      ['What is the difference between BibLaTeX, natbib, Biber, BibTeX...?',
       <span>BibLaTeX is a LaTeX package used to format bibliography. Its “original” counterpart was the <code>\bibliography</code> / <code>\printbibliography</code> in standard LaTeX, the <code>thebibliography</code> environment, or packages such as <code>natbib</code>.
         <br />
       BibTeX and Biber are two external programs that convert a <code>.bib</code> file into a <code>.bbl</code> file readable by LaTeX. One of the main advantages of Biber over BibTeX is its support of Unicode characters. <a href="https://tex.stackexchange.com/q/25701/14965">Read more about this on TeX.SE.</a></span>],
      ['But I want to use the usual bibliography package!',
       <span>I plan to add support for it in the future. In the meantime, <a href="https://github.com/nidrissi/arxiv2bib">feel free to contribute</a> 😃. But be aware that unlike BibLaTeX, the <code>.bst</code> style you choose for your article will influence greatly the required format for the bibliography entry.</span>],
      ['How does the program handle surnames?',
       <span>
         ArXiv stores author names as e.g. "Jane H. Doe." However, BibLaTeX expects surnames to be separated from given names, e.g. "Doe, Jane H." This allows it to make special formatting of names, for example by automatically abbreviating given names ("J. H. Doe") or capitalizing surnames in some styles (e.g. in French: "Jane H. Dᴏᴇ").
         <br />
         To deal with this, I made a very simple and sometimes wrong assumption: the last word in a name is the surname, everything else is the given name. I am aware that this fails when people have two or more surname (e.g. my own full name, “Najib Idrissi Kaïtouni”... or for example in many Spanish names), or when there is an addendum such as "John Doe, Jr." or "Jean de la Fontaine." Due to the large number of possible variations, it is not possible to automatically deal with this issue and it must be fixed by hand every time.
         <br />
         If you feel strongly enough about this, you can try to contact arXiv so that they start storing author names in a more adequate fashion; there is nothing I can do on my end.
       </span>],
      [<span>What is <code>pubstate</code>?</span>,
       <span>In BibLaTeX, it indicates the publication state of the entry. For a preprint, the correct value is <code>prepublished</code>. Other possible values include <code>submitted</code>, <code>forthcoming</code>, and so on (see the BibLaTeX manual). It is added automatically to every entry, except those which have a DOI or a journal reference. Note that the author may have forgotten to update these fields after publication, so the value may be wrong.</span>,],
      [<span>What is <code>howpublished</code>?</span>,
       <span>In BibLaTeX, it is a free-form field that indicates how an <code>@misc</code> entry was published. I populate it with the journal reference if present in arXiv. Consider converting entries with a journal reference to a more appropriate entry type such as <code>@article</code>, <code>@book</code>…</span>],
    ],
  }
];

export default function Help() {
  return (
    <div>
      <h1>Help</h1>
      {faq.map(({ title, entries }) => (
        <React.Fragment key="title">
          <h2>{title}</h2>
          <dl>
            {entries.map(([q, a]) => (
              <React.Fragment key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </React.Fragment>
            ))}
          </dl>
        </React.Fragment>
      ))}
      <p className="text-muted"><i>(More help is coming...)</i></p>
    </div>
  )
}
