import React from "react";
import { Stack, Center, Card, Text, Anchor, Divider, Group, Badge, Flex } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { deleteSnipd, moveSnipdDown, moveSnipdUp } from "../utils/snipUtils";
import ItemControls from "./ItemControls";
import ItemHeader from "./ItemHeader";
import "../styles/SnippetStyles.css"; // Assuming the CSS stays here

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
        />
        <div style={{ display: "flex", width: "100%" }}>
          <ItemControls
            onUpClick={() => moveSnipdUp(props.index).then(props.refetch)}
            onDeleteClick={() => deleteSnipd(props.index).then(props.refetch)}
            onDownClick={() => moveSnipdDown(props.index).then(props.refetch)}
          />

          <Card className="text-content">
            {props.type === "image" && (
              <div className="image-div">
                <img className="image-container" src={props.content} />
              </div>
            )}
            {(props.type === "text" || props.type === "note") && (
              <Text className="text-container" size="sm" color="dimmed">
                {props.content}
              </Text>
            )}
            {props.type === "link" && (
              <div className="link-container">
                <Anchor className="link-anchor" href={props.content}>
                  <Text className="link-url" size="sm" color="dimmed" lineClamp={1}>
                    {props.content}
                  </Text>
                </Anchor>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Divider className="divider" />
    </div>
  );
}
