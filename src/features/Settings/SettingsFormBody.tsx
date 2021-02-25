import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "formik";

import { saveSettings } from "./settingsSlice";
import { SettingField } from "./SettingField";

const SettingsFormBody: React.FC<{ values: Settings }> = ({ values }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveSettings(values));
  }, [dispatch, values]);

  return (
    <Form>
      <h3>Entry display</h3>
      <SettingField id="mode" as="select" label="Mode">
        <option value="biblatex">BibLaTeX (recommended)</option>
        <option value="bibtex">Legacy BibTeX (see the FAQ!)</option>
      </SettingField>
      <SettingField
        as="checkbox"
        id="includeFile"
        label="Include file field in entries"
      />
      <div className="ml-3">
        <SettingField
          as="checkbox"
          id="filePrefix"
          disabled={!values.includeFile}
          label={
            <>
              Add a prefix to the file field (<code>Doe2020.pdf</code> ⇒{" "}
              <code>D/Doe2020.pdf</code>)
            </>
          }
        />
        <SettingField
          as="checkbox"
          id="includeWget"
          disabled={!values.includeFile}
          label={<>Include a download command for the entries.</>}
        />
        <div className="ml-3">
          <SettingField
            as="checkbox"
            id="wgetPowershell"
            disabled={!values.includeFile || !values.includeWget}
            label={
              <>
                Running on Powershell on Windows (default is <code>wget</code>{" "}
                on Unix-like platforms).
              </>
            }
          />
          <SettingField
            as="control"
            id="fileFolder"
            label="The folder for the download command, if any."
            disabled={!values.includeFile || !values.includeWget}
          />
        </div>
      </div>
      <SettingField
        as="checkbox"
        id="includeAbstract"
        label="Include the abstract"
      />
      <SettingField
        as="checkbox"
        id="includePrimaryCategory"
        label={
          <>
            Include the primary category (e.g. <code>math.AT</code>), if any
          </>
        }
      />
      <SettingField
        as="checkbox"
        id="includeVersion"
        label="Include version information"
      />
      <h3>Search settings</h3>
      <SettingField as="select" id="sortBy" label="Sort by">
        <option value="submittedDate">Initial submission date</option>
        <option value="lastUpdatedDate">Last update</option>
        <option value="relevance">Relevance</option>
      </SettingField>
      <SettingField as="select" id="sortOrder" label="Sort order">
        <option value="descending">Descending</option>
        <option value="ascending">Ascending</option>
      </SettingField>
      <SettingField as="select" id="maxResults" label="Max results">
        {[10, 20, 50, 100, 200, 500, 1000].map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </SettingField>
    </Form>
  );
};
export default SettingsFormBody;
