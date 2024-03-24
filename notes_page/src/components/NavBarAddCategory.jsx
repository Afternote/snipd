import React from "react";
import { TextInput, Group, Button } from "@mantine/core";
import "../styles/NavbarSearchStyle.css";
import { IconSearch } from "@tabler/icons-react";

const NavBarAddCategory = (props) => {
  //handleNewCategoryChange, handleAddCategory
  return (
    <Group justify="space-around">
      <TextInput
        style={{ margin: "8px 16px 8px 16px" }}
        placeholder="Add Category"
        size="xs"
        leftSection={<IconSearch style={{ width: "12px", height: "12px" }} stroke={1.5} />}
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
