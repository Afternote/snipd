import React from "react";
import { MantineProvider } from "@mantine/styles";
import { Text } from "@mantine/core";
import { Card } from "@mantine/core";

const TextCard = (props) => {
  return (
    <Card
      shadow="sm"
      padding="xl"
      style={{margin:'16px', backgroundColor:'rgba(0, 108, 255, 0.1)'}}
      component="a"
      target="_blank">
      <MantineProvider
        theme={{
          fontFamily: "Roboto",
        }}>
        <Text fz="md" lh="sm" style={{ padding: "8px" }}>
          {props.snipd?.content}
          <br />
        </Text>
      </MantineProvider>
    </Card>
  );
};

export default TextCard;
