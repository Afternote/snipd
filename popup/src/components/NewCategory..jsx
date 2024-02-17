import React, { useState } from "react";
import { Button, Group, TextInput } from "@mantine/core";

function NewCategory({ addCategory }) {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    addCategory(newCategoryName);
  };

  return (
    <Group position="center">
      <TextInput
        m={8}
        placeholder="New Category Name"
        value={newCategoryName}
        onChange={handleChange}
      />

      <Button m={8} onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
        Add
      </Button>
    </Group>
  );
}

export default NewCategory;
