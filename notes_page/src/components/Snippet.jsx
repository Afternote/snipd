import React from "react";
import { Card, Text, Anchor, Divider } from "@mantine/core";
import { NavLink } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { deleteSnipd, moveSnipdDown, moveSnipdUp } from "../utils/snipUtils";

import ItemHeader from "./ItemHeader";
import { Spoiler } from "@mantine/core";
import "../styles/SnippetStyles.css";
import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
} from "@tabler/icons-react";

export function Snippet(props) {
  const { hovered, ref } = useHover();

  const handleSourceButtonClick = () => {
    window.location.href = props.source;
  };

  return (
    <div className="snippet-container" ref={ref}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <ItemHeader
          type={props.type}
          title={props.title}
          date={props.date}
          source={props.source}
          hovered={hovered}
          onSourceClick={handleSourceButtonClick}
          onUpClick={() => moveSnipdUp(props.index).then(props.refetch)}
          onDeleteClick={() => deleteSnipd(props.index).then(props.refetch)}
          onDownClick={() => moveSnipdDown(props.index).then(props.refetch)}
        />
        <div style={{ display: "flex", width: "100%" }}>
          {/* <ItemControls
            
          /> */}
          {props.type === "image" && (
            <Card className="text-content">
              <div className="image-div">
                <img className="image-container" src={props.content} />
              </div>
            </Card>
          )}
          {(props.type === "text" || props.type === "note") && (
            <Card className="text-content">
              <Spoiler
                maxHeight={90}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={100}>
                <Text className="text-container" size="sm" color="dimmed">
                  {props.content}
                </Text>
              </Spoiler>
            </Card>
          )}
          {props.type === "link" && (
            <Card className="link-content">
              <div className="link-container">
                <Anchor variant="gradient" className="link-anchor" href={props.content}>
                  {props.content}
                </Anchor>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
