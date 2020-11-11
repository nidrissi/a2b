import React from "react";
import { useSelector } from "react-redux";

import { Formik } from "formik";

import { selectSettings } from "./settingsSlice";
import SettingsFormBody from "./SettingsFormBody";

/** The settings form, controls the related redux state. */
const Settings: React.FC<{}> = () => {
  const settings = useSelector(selectSettings);

  return (
    <div>
      <h1>Settings</h1>
      <Formik<Settings>
        component={SettingsFormBody}
        enableReinitialize={true}
        initialValues={settings}
        onSubmit={() => {
          return;
        }}
      />
      <p className="text-muted">
        Settings are saved in your browser's{" "}
        <a href="https://en.wikipedia.org/wiki/Web_storage">local storage</a>{" "}
        (you may need to enable some permissions).
      </p>
    </div>
  );
};
export default Settings;
