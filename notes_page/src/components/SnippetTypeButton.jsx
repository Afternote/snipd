import React from "react";
import "../styles/NavbarSearchStyle.css";
import { Button, Badge } from "@mantine/core";
const SnippetTypeButton = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Button
        variant={props.filterState.selectedType == props.link.type ? "filled" : "subtle"}
        key={props.link.label}
        radius="xs"
        style={{ margin: "4px", width: "100%", display: "flex", justifyContent: "left" }}
        className="mainLink"
        onClick={() => {
          props.setFilterState({ ...props.filterState, selectedType: props.link.type });
        }}>
        <div className="mainLinkInner">
          <props.link.icon size={20} className="mainLinkIcon" stroke={1.5} />
          <span>{props.link.label}</span>
        </div>
      </Button>

      {props.counts[props.link.type] >= 0 ? (
        <Badge size="sm" variant="filled" className="mainLinkBadge">
          {props.counts[props.link.type]}
        </Badge>
      ) : (
        <Badge size="sm" variant="filled" className="mainLinkBadge">
          0
        </Badge>
      )}
    </div>
  );
};

export default SnippetTypeButton;
