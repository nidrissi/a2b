import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Entry from './Entry';

function HelpTooltip({ children }) {
  return (
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip>
          {children}
        </Tooltip>
      }
    >
      <FontAwesomeIcon icon="question-circle" />
    </OverlayTrigger>
  );
}

function StandardInput({ id, label, children }) {
  return (
    <Form.Group as={Row}>
      <Form.Label
        column sm={2}
        htmlFor={id}
      >
        {label}
      </Form.Label>
      <Col>
        {children}
      </Col>
    </Form.Group>
  );
}

export default function DIY() {
  const [type, setType] = useState('Article');
  const [authors, setAuthors] = useState([]);
  const [year, setYear] = useState(0);
  const [journal, setJournal] = useState('');
  const [series, setSeries] = useState('');
  const [number, setNumber] = useState('');
  const [volume, setVolume] = useState('');
  const [pubstate, setPubstate] = useState('');
  const [id, setId] = useState('');
  const [doi, setDoi] = useState('');

  const entry = {
    type,
    authors: authors.map(s => s.trim()),
    year: year || 0,
    journal: (type === 'Article') ? journal : null,
    series,
    number,
    volume,
    pubstate,
    id,
    doi,
  }

  return (
    <>
      <h1>Do It Yourself</h1>
      <Alert variant="warning">Not feature complete yet!</Alert>
      <Form>
        <StandardInput id='type' label='Type'>
          <Form.Control
            id='type'
            as='select'
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value='Article'>Journal article</option>
            <option value='Book'>Book</option>
            <option value='InProceedings'>Conference/Talk proceedings</option>
            <option value='Misc'>Other</option>
          </Form.Control>
        </StandardInput>
        <StandardInput id='authors' label='Authors'>
          <Form.Control
            id='authors'
            value={authors.join('&')}
            onChange={e => setAuthors(e.target.value.split(/&/))}
            placeholder='Author names separated by &'
          />
        </StandardInput>
        <StandardInput id='year' label='Year'>
          <Form.Control
            id='year'
            type='number'
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </StandardInput>

        {/* @article-specific */}
        <div className={type !== 'Article' ? 'd-none' : ''}>
          <Form.Group as={Row}>
            <Form.Label
              column sm={2}
              htmlFor='journal'
            >
              Journal
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                id='journal'
                value={journal}
                onChange={e => setJournal(e.target.value)}
                disabled={type !== 'Article'}
              />
            </Col>
            <Col sm={2}>
              <InputGroup>
                <Form.Control
                  id='jseries'
                  value={series}
                  onChange={e => setSeries(e.target.value)}
                  placeholder='Series'
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <HelpTooltip>
                      The series of the <em>journal</em>, if any. Can be a number (e.g. “Ann. of Math. 2nd series”) or the keys <code>newseries</code> or <code>oldseries</code> (e.g. “Selecta Math. New Series”).
                    </HelpTooltip>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label
              column sm={2}
              htmlFor='jvolume'
            >
              Volume
              {' '}
              <HelpTooltip>
                The volume of the journal in which the article was published.
              </HelpTooltip>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                id='jvolume'
                type='number'
                value={volume}
                onChange={e => setVolume(e.target.value)}
                disabled={type !== 'Article'}
              />
            </Col>
            <Form.Label
              column sm={2}
              htmlFor='jnumber'
            >
              Number
              {' '}
              <HelpTooltip>
                Volumes are sometimes further subdivided in “issues” or something else: the number field refers to this subdivision.
              </HelpTooltip>
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                id='jnumber'
                type='number'
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </Col>
          </Form.Group>
        </div>

        <StandardInput id='pubstate' label='Publication state'>
          <Form.Control
            id='pubstate'
            as='select'
            value={pubstate}
            onChange={e => setPubstate(e.target.value)}
          >
            <option value=''>(leave blank)</option>
            <option value='inpreparation'>In preparation</option>
            <option value='prepublished'>Preprint</option>
            <option value='submitted'>Submitted</option>
            <option value='forthcoming'>Forthcoming (accepted by editor)</option>
            <option value='inpress'>In press (final stages, out of author's hands)</option>
          </Form.Control>
        </StandardInput>

        <StandardInput id='id' label='ArXiv ID'>
          <Form.Control
            id='id'
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </StandardInput>
        <StandardInput id='doi' label='DOI'>
          <Form.Control
            id='doi'
            value={doi}
            onChange={e => setDoi(e.target.value)}
          />
        </StandardInput>
      </Form>

      <Entry entry={entry} />
    </>
  );
}
