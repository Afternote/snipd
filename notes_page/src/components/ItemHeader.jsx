import React from "react";
import { Stack, Badge, Group, Title, Button, rem, Menu, ActionIcon } from "@mantine/core";
import "../styles/SnippetStyles.css";
import AdjustmentsCogIcon from "../assets/icons/AdjustmentsCogIcon";

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
            <Badge style={{ marginRight: "16px" }} color="blue">
              {date}
            </Badge>

            <Menu position="right" styles={{ margin: "8px" }}>
              <Menu.Target>
                <ActionIcon variant="filled" aria-label="Settings">
                  <AdjustmentsCogIcon style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={onUpClick}>Move Up</Menu.Item>
                <Menu.Item onClick={onDownClick}> Move Down</Menu.Item>
                <Menu.Item onClick={onDeleteClick}> Delete</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      }
    </Stack>
  );
}

export default ItemHeader;
