import React, { useRef, useState, useEffect } from "react";
import { Menu, Button, Text, MantineProvider, ScrollArea } from "@mantine/core";
import NewCategory from "./NewCategory.";
import CategoryTwoIcon from "../assets/icons/CategoryTwoIcon";
import CategoryPlusIcon from "../assets/icons/CategoryPlusIcon";

const CategoriesMenuMantine = ({ addCategory, categoriesList, setCategory }) => {
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
        <Button style={{ width: "60%", marginBottom: "24px", marginTop: "8px" }}>
          <MantineProvider theme={{ fontFamily: "Roboto" }}>
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              Categories
            </Text>
          </MantineProvider>
        </Button>
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
