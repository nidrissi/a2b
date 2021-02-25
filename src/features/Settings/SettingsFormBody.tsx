import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BForm from "react-bootstrap/Form";
import { Form, Field } from "formik";

import { saveSettings } from "./settingsSlice";

const SettingsFormBody: React.FC<{ values: Settings }> = ({ values }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveSettings(values));
  }, [dispatch, values]);

  return (
    <Form>
      <h3>Entry display</h3>
      <BForm.Group>
        <Field as="select" className="form-control" name="mode">
          <option value="biblatex">BibLaTeX (recommended)</option>
          <option value="bibtex">Legacy BibTeX (⚠ see help)</option>
        </Field>
      </BForm.Group>
      <BForm.Group>
        <Field
          as={BForm.Check}
          type="checkbox"
          id="includeFile"
          name="includeFile"
          label="Include file field in entries"
        />
      </BForm.Group>
      <BForm.Group className="ml-3">
        <Field
          as={BForm.Check}
          type="checkbox"
          id="filePrefix"
          name="filePrefix"
          disabled={!values.includeFile}
          label={
            <>
              Add a prefix to the file field (<code>Doe2020.pdf</code> ⇒{" "}
              <code>D/Doe2020.pdf</code>)
            </>
          }
        />
      </BForm.Group>
      <div className="ml-3">
        <BForm.Group>
          <Field
            as={BForm.Check}
            type="checkbox"
            name="includeWget"
            id="includeWget"
            disabled={!values.includeFile}
            label={<>Include a download command for the entries.</>}
          />
        </BForm.Group>
        <BForm.Group className="ml-3">
          <Field
            as={BForm.Check}
            type="checkbox"
            name="wgetPowershell"
            id="wgetPowershell"
            disabled={!values.includeFile || !values.includeWget}
            label={
              <>
                Running on Powershell on Windows (default is <code>wget</code>{" "}
                on Unix-like platforms).
              </>
            }
          />
        </BForm.Group>
        <BForm.Group className="ml-3">
          <BForm.Label htmlFor="fileFolder">
            The folder for the download command, if any.
          </BForm.Label>
          <Field
            className="form-control"
            name="fileFolder"
            id="fileFolder"
            disabled={!values.includeFile || !values.includeWget}
          />
        </BForm.Group>
      </div>
      <BForm.Group>
        <Field
          as={BForm.Check}
          type="checkbox"
          name="includeAbstract"
          id="includeAbstract"
          label="Include the abstract"
        />
      </BForm.Group>
      <BForm.Group>
        <Field
          as={BForm.Check}
          type="checkbox"
          name="includePrimaryCategory"
          id="includePrimaryCategory"
          label={
            <>
              Include the primary category (e.g. <code>math.AT</code>), if any
            </>
          }
        />
      </BForm.Group>
      <BForm.Group>
        <Field
          as={BForm.Check}
          type="checkbox"
          name="includeVersion"
          id="includeVersion"
          label="Include version information"
        />
      </BForm.Group>
      <h3>Search settings</h3>
      <BForm.Group>
        <BForm.Label htmlFor="sortBy">Sort by</BForm.Label>
        <Field className="form-control" as="select" name="sortBy" id="sortBy">
          <option value="submittedDate">Initial submission date</option>
          <option value="lastUpdatedDate">Last update</option>
          <option value="relevance">Relevance</option>
        </Field>
      </BForm.Group>
      <BForm.Group>
        <BForm.Label htmlFor="sortOrder">Sort order</BForm.Label>
        <Field
          className="form-control"
          as="select"
          name="sortOrder"
          id="sortOrder"
        >
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </Field>
      </BForm.Group>
      <BForm.Group>
        <BForm.Label htmlFor="maxResults">Max results</BForm.Label>
        <Field
          className="form-control"
          as="select"
          name="maxResults"
          id="maxResults"
        >
          {[10, 20, 50, 100, 200, 500, 1000].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Field>
      </BForm.Group>
    </Form>
  );
};
export default SettingsFormBody;
