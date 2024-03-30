import React from "react";
import { Button, MantineProvider, Text } from "@mantine/core";
import "../styles/Notes.css";

const CustomButton = (props) => {
  return (
    <Button className="button" variant="filled" onClick={props.onClick} color={props.color} radius="lg">
      <MantineProvider
        theme={{
          fontFamily: "Roboto",
        }}>
        <props.icon/>
        <Text className="button-text" fz="md" lh="sm">
          {props.content}
        </Text>
      </MantineProvider>
    </Button>
  );
};

export default CustomButton;
