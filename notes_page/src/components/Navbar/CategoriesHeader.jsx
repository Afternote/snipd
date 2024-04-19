import React from "react";
import {
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import "../../styles/NavbarSearchStyle.css";
import PlusIcon from "../../assets/icons/PlusIcon";

const CategoriesHeader = (props) => {
  return (
    <Group className="collectionsHeader" justify="space-between">
      <Text size="xs" fw={500} c="dimmed">
        Categories
      </Text>
      <Tooltip label="Create category" withArrow position="right">
        <ActionIcon variant="default" size={18} onClick={props.handleCreateCategoryClick}>
          <PlusIcon style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default CategoriesHeader;
