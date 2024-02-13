import React from 'react';
import { Stack, Center, Card, Text, Anchor, Divider, Group, Badge } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { deleteSnipd, moveSnipdDown, moveSnipdUp } from '../utils/snipUtils'; 
import ItemControls from './ItemControls';
import ItemHeader from './ItemHeader';
import '../styles/SnippetStyles.css'; // Assuming the CSS stays here

export function Snippet(props) {
  const { hovered, ref } = useHover();

  const handleSourceButtonClick = () => {
    window.location.href = props.source;
  };

  return (
    <div className="snippet-container" ref={ref}>
      <ItemControls 
        onUpClick={() => moveSnipdUp(props.index).then(props.refetch)}
        onDeleteClick={() => deleteSnipd(props.index).then(props.refetch)}
        onDownClick={() => moveSnipdDown(props.index).then(props.refetch)}
      />

      <ItemHeader 
        type={props.type}
        title={props.title}
        date={props.date}
        source={props.source}
        hovered={hovered}
        onSourceClick={handleSourceButtonClick}
      />

      <Center>
        <Card className="text-content">
          {props.type === 'image' && (
            <Center>
              <img className="image-container" src={props.content} loading="lazy" />
            </Center>
          )}
          {(props.type === 'text' || props.type === 'note') && (
            <Text size="sm" color="dimmed">
              {props.content}
            </Text>
          )}
          {props.type === 'link' && (
            <div className="link-container">
            <Anchor className="link-anchor" href={props.content}>
              <Stack className="link-stack" spacing="xs">
                <Group position="apart">
                  <Text className="link-title" lineClamp={1}>
                    {props.title}
                  </Text>

                  <Badge className="link-date" color="gray" size="sm" radius="sm" variant="outline">
                    {props.date}
                  </Badge>
                </Group>
                <Text className="link-url" size="sm" color="dimmed" lineClamp={1}>
                  {props.content}
                </Text>
              </Stack>
            </Anchor>
          </div>
          )}
        </Card>
      </Center>

      <Divider className="divider" />
    </div>
  );
}
