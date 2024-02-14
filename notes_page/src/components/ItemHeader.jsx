import React from 'react';
import { Stack, Badge, Group, Title, Button } from '@mantine/core';
import '../styles/SnippetStyles.css'; // Assuming the CSS stays here

function ItemHeader({ type, title, date, source, hovered, onSourceClick }) {
  return (
    <Stack className="item-title-date-source">
      { type !== 'note' && (
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Group position="apart">
            <Title order={3}>{title}</Title>
            {hovered && (
              <Button compact variant="light" onClick={onSourceClick}>
                Source
              </Button>
            )}
          </Group>
          <Badge
            style={{ marginRight: '16px' }}
            color="gray"
            size="sm"
            radius="sm"
            variant="outline"
          >
            {date}
          </Badge>
          </div>
      )}
    </Stack>
  );
}

export default ItemHeader;
