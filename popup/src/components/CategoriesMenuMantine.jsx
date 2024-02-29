import React from "react";
import { Menu, Button, Text, rem, MantineProvider, ScrollArea } from "@mantine/core";
import NewCategory from "./NewCategory.";
import { IconCategoryPlus, IconCategory2 } from "@tabler/icons-react";

const CategoriesMenuMantine = ({ addCategory, categoriesList, setCategory }) => {
  const [custom, setCustom] = React.useState(false);
  const [categoryAdded, setCategoryAdded] = React.useState('')

  const viewport = React.useRef(null);
  React.useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current?.scrollHeight, behavior: 'smooth' });

  }, [categoryAdded] )

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
        <ScrollArea style={{ height: 250 }} viewportRef={viewport}>
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
            variant="outline"
            onClick={(e) => {
              e.stopPropagation(); 
              handleCustomClose();
            }}
            onKeyDown={(e) => e.stopPropagation()}
            >
            Add a new Category
            <IconCategoryPlus style={{paddingLeft:'16px'}}size={14} />
          </Button>
        ) : (
            <NewCategory setCustom={setCustom} addCategory={addCategory} setCategoryAdded={setCategoryAdded} style={{ margin: "8px" }} />
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CategoriesMenuMantine;
