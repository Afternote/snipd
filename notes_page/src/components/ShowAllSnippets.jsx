import React from "react";
import { Button, Group, Stack, Divider, Title, AppShell } from "@mantine/core";

export const ShowAllSnippets = (props) => {
  return (
    <Button
      variant="outline"
      color="error"
      onClick={() => {
        props.setSelectedCategory("");
        props.setSelectedType("");
      }}>
      Show all snipds
    </Button>
  );
};
