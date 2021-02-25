import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
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
    <Alert variant="success">
      <FontAwesomeIcon icon="check" className="mr-1" />
      {totalText}
      <Button
        size="sm"
        variant="success"
        className="float-right mx-1"
        onClick={onClickCopyAll}
      >
        <FontAwesomeIcon icon="clipboard" /> Copy all
      </Button>
      <Button
        size="sm"
        variant="success"
        className="float-right mx-1"
        onClick={onClickDownloadAll}
      >
        <FontAwesomeIcon icon="save" /> Download all
      </Button>
    </Alert>
  );
};
export default CopyAndTotal;
