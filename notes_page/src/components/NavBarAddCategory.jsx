import React from "react";
import { TextInput, Group, Button } from "@mantine/core";
import "../styles/NavbarSearchStyle.css";

const NavBarAddCategory = (props) => {
  //handleNewCategoryChange, handleAddCategory
  return (
    <Group justify="space-around">
      <TextInput
        style={{ margin: "8px 16px 8px 16px" }}
        placeholder="Add Category"
        size="xs"
        rightSectionWidth={70}
        onChange={props.handleNewCategoryChange}
        styles={{ section: { pointerEvents: "none" } }}
        mb="sm"
      />
      <Button variant="outline" size="xs" onClick={props.handleAddCategory}>
        Add
      </Button>
    </Group>
  );
};

export default NavBarAddCategory;
