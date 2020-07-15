import React from 'react';

import faq from './faq';

function TOC() {
  return (
    <ul className="list-unstyled">
      {faq.map(({title, key, entries }) => (
        <li key={key}>
          <a href={`#${key}`}>
            <strong>
              {title}
            </strong>
          </a>
          <ul className="list-unstyled ml-2">
            {entries.map(({key, q}) => (
              <li key={key}>
                <a href={`#${key}`}>
                   {q}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function FAQBody() {
  return faq.map(({ title, key, entries }) => (
    <React.Fragment key={key}>
      <h2 id={key}>{title}</h2>
      <dl>
        {entries.map(({ key, q, a }) => (
          <React.Fragment key={key}>
            <dt id={key}>{q}</dt>
            <dd>{a}</dd>
          </React.Fragment>
        ))}
      </dl>
    </React.Fragment>
  ));
}

export default function Help() {
  return (
    <>
      <h1>Help</h1>
      <TOC />
      <FAQBody />
    </>
  )
}
