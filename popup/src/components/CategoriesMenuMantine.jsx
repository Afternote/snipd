import React, { useRef, useState, useEffect } from "react";
import { Menu, Button, Badge, Divider, ScrollArea } from "@mantine/core";
import NewCategory from "./NewCategory.";
import CategoryTwoIcon from "../assets/icons/CategoryTwoIcon";
import CategoryPlusIcon from "../assets/icons/CategoryPlusIcon";
import EditIcon from "../assets/icons/EditIcon";
import "../styles/Notes.css";
import "../styles/Categories.css";

const CategoriesMenuMantine = ({ category, addCategory, categoriesList, setCategory }) => {
  const [custom, setCustom] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState("");

  const viewport = useRef(null);

  useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current?.scrollHeight, behavior: "smooth" });
  }, [categoryAdded]);

  const handleCustomClose = () => {
    setCustom(true);
  };

  return (
    <Menu shadow="md" width={250}>
      <Menu.Target>
        <Badge
          size="lg"
          radius="sm"
          style={{ margin: "8px 8px 4px 8px" }}
          variant="light"
          color="rgba(73, 152, 201, 1)">
          Category:
          {console.log(category)}
          <Button style={{ color: "rgba(196, 77, 77, 1)" }} variant="transparent" size="sm">
            {category}
            <EditIcon size={14} />
          </Button>
        </Badge>
      </Menu.Target>

      <Menu.Dropdown onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <Menu.Label>Select a Category</Menu.Label>
        <ScrollArea style={{ height: 250 }} viewportRef={viewport}>
          {categoriesList.map((category) => (
            <Menu.Item
              rightSection={<CategoryTwoIcon style={{ width: "1rem", height: "1rem" }} />}
              key={category}
              onClick={(e) => {
                e.stopPropagation();
                setCategory(category);
              }}>
              {category}
            </Menu.Item>
          ))}
        </ScrollArea>

        <Divider my="xs" label="Or, Add a new Category" labelPosition="center" />

        <NewCategory
          setCustom={setCustom}
          addCategory={addCategory}
          setCategoryAdded={setCategoryAdded}
          style={{ margin: "8px" }}
        />
      </Menu.Dropdown>
    </Menu>
  );
};

export default CategoriesMenuMantine;
