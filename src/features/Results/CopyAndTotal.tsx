import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CopyAndTotalProps = {
  totalText: JSX.Element;
  outerRef: React.RefObject<HTMLDivElement>;
};
const CopyAndTotal: React.FC<CopyAndTotalProps> = ({ totalText, outerRef }) => {
  const getResult = (): string => {
    if (!outerRef.current) {
      return "";
    }
    const result = Array.from(outerRef.current.getElementsByTagName("pre")).map(
      (pre) => pre.innerText
    );
    return result.join("\n\n");
  };
  const onClickCopyAll = (_e: any) => {
    navigator.clipboard.writeText(getResult());
  };
  const onClickDownloadAll = (_e: any) => {
    const result = getResult();
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(result)
    );
    element.setAttribute("download", "references.bib");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-green-600 text-white p-2 my-2 rounded-lg block sm:flex items-center gap-3">
      <div className="flex-grow">
        <FontAwesomeIcon icon="check" className="mr-1" />
        {totalText}
      </div>
      <div>
        <button
          onClick={onClickCopyAll}
          className="hover:underline focus:bg-green-800 p-1"
        >
          <FontAwesomeIcon icon="clipboard" /> Copy all
        </button>
      </div>
      <div>
        <button
          onClick={onClickDownloadAll}
          className="hover:underline focus:bg-green-800 p-1"
        >
          <FontAwesomeIcon icon="save" /> Download all
        </button>
      </div>
    </div>
  );
};
export default CopyAndTotal;
