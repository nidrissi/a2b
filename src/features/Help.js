import React from 'react';

const faq = [
  ['What is this?',
   <span>This program fetches entries from the <a href="https://arxiv.org">arXiv</a> and formats them to be used with BibLaTeX.</span>],
  ['How does it fetch entries?',
   <span>It uses the <a href="https://arxiv.org/help/api/index">arXiv API</a> with all its quirks.</span>],
  ['What format is the output?',
   <span>
     The output is formatted to be used with <a href="https://www.ctan.org/pkg/biblatex">BibLaTeX</a>. BibLaTeX is a more modern approach to bibliography than LaTeX's default bibliography support and has many advantages over it. In particular, its database format is well-defined, as opposed to the default format, where a field can have different meanings depending on the chosen style (the <code>.bst</code> file that you choose with <code>\bibliographystyle</code>). It is able to accurately represent an arXiv entry, while the default styles cannot.
   </span>],
  ['What is the difference between BibLaTeX, natbib, Biber, BibTeX...?',
   <span>BibLaTeX is a LaTeX package used to format bibliography. Its “original” counterpart was the <code>\bibliography</code> / <code>\printbibliography</code> in standard LaTeX, the <code>thebibliography</code> environment, or packages such as <code>natbib</code>.
     <br/>
   BibTeX and Biber are two external programs that convert a <code>.bib</code> file into a <code>.bbl</code> file readable by LaTeX. One of the main advantages of Biber over BibTeX is its support of Unicode characters. <a href="https://tex.stackexchange.com/q/25701/14965">Read more about this on TeX.SE.</a></span>],
  ['But I want to use the usual bibliography package!',
   <span>I plan to add support for it in the future. In the meantime, <a href="https://github.com/nidrissi/arxiv2bib">feel free to contribute</a> 😃. But be aware that unlike BibLaTeX, the style you choose for your article will influence greatly the required format for the bibliography entry.</span> ],
];

export default function Help() {
  return (
    <div>
      <h1>Help</h1>
      <dl>
        {faq.map(([q, a]) => {
          return (
            <React.Fragment key={q}>
              <dt>{q}</dt>
              <dd>{a}</dd>
            </React.Fragment>
          );
        })}
      </dl>
      <p className="text-muted"><i>(More help is coming...)</i></p>
    </div>
  )
}
