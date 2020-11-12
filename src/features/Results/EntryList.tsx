import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { selectAllEntries, selectTotalEntriesFound } from "./resultsSlice";
import { selectSettings } from "../Settings/settingsSlice";

import EntryCard from "../EntryCard";
import CopyAndTotal from "./CopyAndTotal";

/** The list of all entries. Entry ids are taken from the redux state
 * and then rendered using `EntryById`. Then adds buttons to copy entries
 * to the clipboards and counts how many are displayed out of the total.
 */
const EntryList: React.FC<{}> = () => {
  const entries = useSelector(selectAllEntries);

  const renderedEntries = entries.map((entry) => (
    <EntryCard key={entry.id} entry={entry} />
  ));

  const outerRef = useRef<HTMLDivElement>(null);

  const { mode } = useSelector(selectSettings);
  const totalEntriesFound = useSelector(selectTotalEntriesFound);
  const totalText = (
    <>
      Showing {entries.length} entries out of {totalEntriesFound} in total.
      {mode === "bibtex" ? (
        <>
          {" "}
          <span className="text-danger">
            Running in legacy BibTeX mode. Check entries for issues.
          </span>
        </>
      ) : null}
    </>
  );

  // null means that entries haven't been fetched yet
  return totalEntriesFound === null ? null : (
    <div ref={outerRef}>
      <CopyAndTotal totalText={totalText} outerRef={outerRef} />
      {renderedEntries}
    </div>
  );
};
export default EntryList;
