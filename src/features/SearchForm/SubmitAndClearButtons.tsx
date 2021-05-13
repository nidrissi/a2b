import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

/** The submit and clear buttons used in SearchForm.
    @param isLoading Whether the form is currently loading or not.
 */
const SubmitAndClearButtons: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  return (
    <div className="row-span-full flex space-x-2">
      <button
        className={`block flex-grow p-2 bg-blue-800 text-white rounded-md ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <span>
            <FontAwesomeIcon icon={faSearch} /> Search
          </span>
        )}
      </button>
      <button
        className="block w-1/4 flex-shrink p-2 bg-gray-300 rounded-md"
        type="reset"
      >
        <FontAwesomeIcon icon={faTrashAlt} /> Clear
      </button>
    </div>
  );
};
export default SubmitAndClearButtons;
