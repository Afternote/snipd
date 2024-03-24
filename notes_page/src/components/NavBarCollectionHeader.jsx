import React from "react";
import {
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";
import "../styles/NavbarSearchStyle.css";
const NavBarCollectionHeader = (props) => {
  return (
    <Group className="collectionsHeader" justify="space-between">
      <Text size="xs" fw={500} c="dimmed">
        Categories
      </Text>
      <Tooltip label="Create category" withArrow position="right">
        <ActionIcon variant="default" size={18} onClick={props.handleCreateCategoryClick}>
          <IconPlus style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default NavBarCollectionHeader;
