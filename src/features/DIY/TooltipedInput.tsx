import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Adds a tooltip to an input.
    @param children The input to be tooltip.
    @param help The help text.
 */
const TooltipedInput: React.FC<{ help: string | JSX.Element; id: string }> = ({
  children,
  help,
  id,
}) => {
  return (
    <InputGroup>
      {children}
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-" + id}>{help}</Tooltip>}
      >
        <InputGroup.Append>
          <InputGroup.Text>
            <FontAwesomeIcon icon="question-circle" />
          </InputGroup.Text>
        </InputGroup.Append>
      </OverlayTrigger>
    </InputGroup>
  );
};
export default TooltipedInput;
