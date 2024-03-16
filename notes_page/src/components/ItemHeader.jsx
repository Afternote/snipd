import React from "react";
import { Stack, Badge, Group, Title, Button, rem, Menu  } from "@mantine/core";
import "../styles/SnippetStyles.css"; // Assuming the CSS stays here
import { ActionIcon } from "@mantine/core";
import {
  IconAdjustmentsCog,
  IconArrowsUp,
  IconArrowsDown,
  IconTrash,
} from "@tabler/icons-react";


function ItemHeader({
  title,
  date,
  hovered,
  onSourceClick,
  onUpClick,
  onDeleteClick,
  onDownClick,
}) {
  return (
    <Stack className="item-title-date-source">
      {
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Group position="apart">
            <Title order={3}>{title}</Title>
            {hovered && (
              <Button compact variant="light" onClick={onSourceClick}>
                Source
              </Button>
            )}
          </Group>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Badge
              style={{ marginRight: "16px" }}
              color="gray"
              size="sm"
              radius="sm"
              variant="outline">
              {date}
            </Badge>

            <Menu position="right" styles={{ margin: "8px" }}>
              <Menu.Target>
                <ActionIcon variant="filled" aria-label="Settings">
                  <IconAdjustmentsCog style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={onUpClick}
                  leftSection={<IconArrowsUp style={{ width: rem(14), height: rem(14) }} />}>
                  Move Up
                </Menu.Item>
                <Menu.Item
                  onClick={onDownClick}
                  leftSection={<IconArrowsDown style={{ width: rem(14), height: rem(14) }} />}>
                  Move Down
                </Menu.Item>
                <Menu.Item
                  onClick={onDeleteClick}
                  leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      }
    </Stack>
  );
}

export default ItemHeader;
