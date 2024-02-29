import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import '../styles/SnipdButtonStyle.css';
import snipdLogoText from "../assets/snipdLogoText.png";


import React from 'react'

export const SnipdButton = () => {
  const handleChevronRightClick = () => {
    window.open('https://github.com/PDFilez/snipd', '_blank')
  }
  return (
    <UnstyledButton className='user'>
      <Group>

        <div style={{ flex: 1 }}>
          <img style ={{width: "200px", margin: "16px 8px 16px 8px"}} src={snipdLogoText}/>
        </div>

        <IconChevronRight onClick={handleChevronRightClick} style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}
