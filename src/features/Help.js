import React from 'react';

const faq = [
  [ "What is this?",
    <span>This program fetches entries from the <a href="https://arxiv.org">arXiv</a> and formats them to be used with biblatex.</span> ],
  [ "How does it fetch entries?",
    <span>It uses the <a href="https://arxiv.org/help/api/index">arXiv API</a> with all its quirks.</span> ]
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
