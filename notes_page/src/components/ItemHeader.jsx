import React from 'react';
import { Stack, Badge, Group, Title, Button } from '@mantine/core';
import '../styles/SnippetStyles.css'; // Assuming the CSS stays here

function ItemHeader({ type, title, date, source, hovered, onSourceClick }) {
  return (
    <Stack className="item-title-date-source">
      {type !== 'link' && type !== 'note' && (
        <Stack align="flex-start">
          <Badge
            style={{ marginRight: '16px' }}
            color="gray"
            size="sm"
            radius="sm"
            variant="outline"
          >
            {date}
          </Badge>
          <Group position="apart">
            <Title order={3}>{title}</Title>
            {hovered && (
              <Button compact variant="light" onClick={onSourceClick}>
                Source
              </Button>
            )}
          </Group>
        </Stack>
      )}
    </Stack>
  );
}

export default ItemHeader;
