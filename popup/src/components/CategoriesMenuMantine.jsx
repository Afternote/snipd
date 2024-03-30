import React, { useRef, useState, useEffect } from "react";
import { Menu, Button, Badge, Text, MantineProvider, ScrollArea } from "@mantine/core";
import NewCategory from "./NewCategory.";
import CategoryTwoIcon from "../assets/icons/CategoryTwoIcon";
import CategoryPlusIcon from "../assets/icons/CategoryPlusIcon";
import EditIcon from "../assets/icons/EditIcon";
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
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Badge
          size="lg"
          radius="sm"
          style={{ margin: "8px 8px 4px 8px" }}
          variant="light"
          color="rgba(73, 152, 201, 1)">
          Current category:
          <Button style={{ color: "rgba(196, 77, 77, 1)" }} variant="transparent" size="sm">
            {category}
            <EditIcon size={14} />
          </Button>
        </Badge>
      </Menu.Target>

      <Menu.Dropdown onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <Menu.Label>Categories</Menu.Label>
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
        <Menu.Divider />

        <Menu.Label>Custom</Menu.Label>
        {!custom ? (
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleCustomClose();
            }}>
            Add a new Category
            <CategoryPlusIcon style={{ paddingLeft: "16px" }} size={14} />
          </Button>
        ) : (
          <NewCategory
            setCustom={setCustom}
            addCategory={addCategory}
            setCategoryAdded={setCategoryAdded}
            style={{ margin: "8px" }}
          />
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CategoriesMenuMantine;
