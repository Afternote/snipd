import React from "react";
import "../styles/NavbarSearchStyle.css";
import {
  UnstyledButton,
  Badge,
  
} from "@mantine/core";
const SnippetTypeButton = (props) => {
  return (
    <div>
      <UnstyledButton
        key={props.link.label}
        className="mainLink"
        onClick={() => {
          props.setFilterState({ ...props.filterState, selectedType: props.link.type });
        }}>
        <div className="mainLinkInner">
          <props.link.icon size={20} className="mainLinkIcon" stroke={1.5} />
          <span>{props.link.label}</span>
        </div>
        {props.counts[props.link.type] && (
          <Badge size="sm" variant="filled" className="mainLinkBadge">
            {props.counts[props.link.type]}
          </Badge>
        )}
      </UnstyledButton>
    </div>
  );
};

export default SnippetTypeButton;
