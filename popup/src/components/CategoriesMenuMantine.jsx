import React from "react";
import { Menu, Button, Text, rem, MantineProvider, ScrollArea } from "@mantine/core";
import NewCategory from "./NewCategory.";
import { IconCategoryPlus, IconCategory2 } from "@tabler/icons-react";

const CategoriesMenuMantine = ({ addCategory, categoriesList, setCategory }) => {
  const [custom, setCustom] = React.useState(false);

  const handleCustomClose = () => {
    setCustom(true);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  return (
    <Menu shadow="md" width={200} >
      <Menu.Target>
        <Button style={{ width: "60%", marginBottom: "24px", marginTop: "8px" }}>
          <MantineProvider
            theme={{
              fontFamily: "Roboto",
            }}>
            <Text fz="md" lh="sm" style={{ padding: "8px" }}>
              Categories
            </Text>
          </MantineProvider>
        </Button>
      </Menu.Target>

      <Menu.Dropdown onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <Menu.Label>Categories</Menu.Label>
        <ScrollArea style={{ height: 250 }}>
          {categoriesList.map((category) => {
            return (
              <Menu.Item
                rightSection={<IconCategory2 style={{ width: rem(14), height: rem(14) }} />}
                key={category}
                onClick={(e) => {
                    e.stopPropagation(); // Stop the event from bubbling up
                  setCategory(category);
                }}>
                {category}
              </Menu.Item>
            );
          })}
        </ScrollArea>
        <Menu.Divider />

        <Menu.Label>Custom</Menu.Label>
        {!custom ? (
          <Button
            variant="transparent"
            color="indigo"
            onClick={(e) => {
              e.stopPropagation(); 
              handleCustomClose();
            }}
            onKeyDown={(e) => e.stopPropagation()}
            rightSection={<IconCategoryPlus size={14} />}>
            Create a new Category
          </Button>
        ) : (
            <NewCategory setCustom={setCustom} addCategory={addCategory} style={{ margin: "8px" }} />
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CategoriesMenuMantine;
