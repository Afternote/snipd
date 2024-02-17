import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import '../styles/SnipdButtonStyle.css';
import snipdRobo from "../assets/snipdRobo.png";
import snipdLogoText from "../assets/snipdLogoText.png";


import React from 'react'

export const SnipdButton = () => {
  return (
    <UnstyledButton className='user'>
      <Group>
        

        <div style={{ flex: 1 }}>
          <img style ={{width: "200px", margin: "16px 8px 16px 8px"}} src={snipdLogoText}/>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}
