import React from 'react';

const faq = [
  { title: "This program",
    entries: [
      ['What is this?',
       <span>This program fetches entries from the <a href="https://arxiv.org">arXiv</a> and formats them to be used with BibLaTeX.</span>],
      ['Who wrote it?',
       <span>I am <a href="https://idrissi.eu">Najib Idrissi</a>, a mathematician.</span>],
      ['What license is this program?',
       <span>It is licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3</a>. The source code is <a href="https://github.com/nidrissi/arxiv2bib">available on GitHub</a>.</span>],
      ['Does it work?',
       'I guess it does, however it is in a preliminary state. There is little error checking in the code, and no tests. Caveat emptor!'],
      ['I found a bug!',
       <span>Please <a href="https://github.com/nidrissi/arxiv2bib/issues">report an issue on Github</a> (or contact me by email).</span>],
      ['How does it fetch entries?',
       <span>It uses the <a href="https://arxiv.org/help/api/index">arXiv API</a> with all its quirks.</span>],
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
       <span>I plan to add support for it in the future. In the meantime, <a href="https://github.com/nidrissi/arxiv2bib">feel free to contribute</a> 😃. But be aware that unlike BibLaTeX, the style you choose for your article will influence greatly the required format for the bibliography entry.</span>],
      ['How does the program handle surnames?',
       <span>
         ArXiv stores author names as e.g. "Jane H. Doe." However, BibLaTeX expects surnames to be separated from given names, e.g. "Doe, Jane H." This allows it to make special formatting of names, for example by automatically abbreviating given names ("J. H. Doe") or capitalizing surnames in some styles (e.g. in French: "Jane H. Dᴏᴇ").
         <br />
         To deal with this, I made a very simple and sometimes wrong assumption: the last word in a name is the surname, everything else is the given name. I am aware that this fails when people have two or more surname (e.g. my own full name, “Najib Idrissi Kaïtouni”... or for example in many Spanish names), or when there is an addendum such as "John Doe, Jr." or "Jean de la Fontaine." Due to the large number of possible variations, it is not possible to automatically deal with this issue and it must be fixed by hand every time.
         <br />
         If you feel strongly enough about this, you can try to contact arXiv so that they start storing author names in a more adequate fashion; there is nothing I can do on my end.
       </span>]
    ],
  }
];

export default function Help() {
  return (
    <div>
      <h1>Help</h1>
      {faq.map(({title, entries}) => (
        <React.Fragment key="title">
          <h2>{title}</h2>
          <dl>
            {entries.map(([q,a]) => (
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
