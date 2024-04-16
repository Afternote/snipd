import React from "react";
import { Stack, Badge, Group, Title, Button, ActionIcon, Text } from "@mantine/core";
import "../styles/SnippetStyles.css";
import ArrowUpIcon from "../assets/icons/ArrowUpIcon";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon";
import TrashIcon from "../assets/icons/TrashIcon";
import EditIcon from "../assets/icons/EditIcon";

function ItemHeader({
  title,
  date,
  hovered,
  onSourceClick,
  onUpClick,
  onDeleteClick,
  onDownClick,
  editFlag,
  setEditFlag,
  snipType,
  category
}) {
  const handleEditClick = () => {
    setEditFlag(!editFlag);
  };

  return (
    <Stack>
      {
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Title order={3}>{title}</Title>
              <Text size="xs" c="grey">Category: {category}</Text>

              
            </div>
            <Button
              style={{ marginLeft: "8px" }}
              variant="subtle"
              size="xs"
              radius="xl"
              onClick={onSourceClick}>
              Source
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Badge style={{ marginRight: "16px" }} color="blue">
              {date}
            </Badge>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <ActionIcon
                onClick={onUpClick}
                style={{ margin: "1px" }}
                variant="filled"
                aria-label="Up">
                <ArrowUpIcon />
              </ActionIcon>

              <ActionIcon
                onClick={onDownClick}
                style={{ margin: "1px" }}
                variant="filled"
                aria-label="Down">
                <ArrowDownIcon />
              </ActionIcon>

              <ActionIcon
                onClick={onDeleteClick}
                style={{ margin: "1px" }}
                variant="filled"
                aria-label="Delete">
                <TrashIcon />
              </ActionIcon>
              <ActionIcon
                disabled={!(snipType == "text" || snipType == "note")}
                onClick={handleEditClick}
                style={{ margin: "1px" }}
                variant="filled"
                aria-label="Edit">
                <EditIcon />
              </ActionIcon>
            </div>
          </div>
        </div>
      }
    </Stack>
  );
}

export default ItemHeader;
