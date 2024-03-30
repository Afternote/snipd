import React from "react";
import { MantineProvider, Text, Card } from "@mantine/core";
import { truncateString } from "../../../utils/snippitUtils";
import "../../../styles/Notes.css";

const LinkCard = (props) => {
  const truncatedContent = truncateString(props.truncatedContent, 40);

  return (
    <Card
      shadow="sm"
      padding="xl"
      style={{ margin: "16px", backgroundColor: "rgba(0, 108, 255, 0.1)" }}
      component="a"
      target="_blank">
      <MantineProvider
        theme={{
          fontFamily: "Roboto",
        }}>
        <Text fz="md" lh="sm" style={{ padding: "8px" }}>
          <a href={truncatedContent}>{truncatedContent}</a>
          <br />
        </Text>
      </MantineProvider>
    </Card>
  );
};

export default LinkCard;
