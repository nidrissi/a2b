import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Entry from './Entry';

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
        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='type'
          >
            Type
          </Form.Label>
          <Col>
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
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='authors'
          >
            Authors
          </Form.Label>
          <Col>
            <Form.Control
              id='authors'
              value={authors.join('&')}
              onChange={e => setAuthors(e.target.value.split(/&/))}
              placeholder='Author names separated by &'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='year'
          >
            Year
          </Form.Label>
          <Col>
            <Form.Control
              id='year'
              type='number'
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </Col>
        </Form.Group>

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
              <Form.Control
                id='jseries'
                value={series}
                onChange={e => setSeries(e.target.value)}
                placeholder='Journal series'
                title='The series of the *journal*. Can be a number (e.g. Ann. of Math. 2nd series) or the keys newseries or oldseries (e.g. Selecta Math. N.S.)'
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label
              column sm={2}
              htmlFor='jvolume'
            >
              Volume
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                id='jvolume'
                type='number'
                value={volume}
                onChange={e => setVolume(e.target.value)}
                disabled={type !== 'Article'}
                title='The volume of the journal. Typically, one or two volumes a year.'
              />
            </Col>
            <Form.Label
              column sm={2}
              htmlFor='jnumber'
            >
              Number
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                id='jnumber'
                type='number'
                value={number}
                onChange={e => setNumber(e.target.value)}
                title='The number of the issue inside the volume.'
              />
            </Col>
          </Form.Group>
        </div>

        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='pubstate'
          >
            Publication state
          </Form.Label>
          <Col>
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
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='id'
          >
            ArXiv ID
          </Form.Label>
          <Col>
            <Form.Control
              id='id'
              value={id}
              onChange={e => setId(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='doi'
          >
            DOI
          </Form.Label>
          <Col>
            <Form.Control
              id='doi'
              value={doi}
              onChange={e => setDoi(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>

      <Entry entry={entry} />
    </>
  );
}
