import React from 'react';
import { Card, Stack } from '@mantine/core';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import '../styles/SnippetStyles.css'; // Assuming the CSS stays here

function ItemControls({ onUpClick, onDeleteClick, onDownClick }) {
  return (
    <Card className="printHide item-controls" radius={8}>
      <Stack style={{ height: '100%' }} align="center" justify="space-around">
        <ArrowCircleUpIcon className="item-controls-icon" onClick={onUpClick} />
        <DeleteForeverIcon className="item-controls-icon" onClick={onDeleteClick} />
        <ArrowCircleDownIcon className="item-controls-icon" onClick={onDownClick} />
      </Stack>
    </Card>
  );
}

export default ItemControls; 