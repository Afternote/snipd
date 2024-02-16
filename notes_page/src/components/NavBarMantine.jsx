import React from "react";
import {
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import { SnipdButton } from "./SnipdButton";
import { IconSearch, IconBlockquote, IconPhoto, IconUnlink, IconNote, IconPlus } from "@tabler/icons-react";

import "../styles/NavbarSearchStyle.css";

const links = [
  { icon: IconBlockquote, label: "Text", notifications: 3 },
  { icon: IconPhoto, label: "Images", notifications: 4 },
  { icon: IconUnlink, label: "Links" },
  { icon: IconNote, label: "Notes" },
];



const collections = [
  {label: "Default"},
  {label: "Brainstorming"},
  {label: "To-Do"},
  {label: "Research"},
  {label: "Meetings"},
  {label: "Quotes"},
  {label: "Books"},
  {label: "Articles"},
  {label: "Inspiration"},
]


const NavBarMantine = () => {
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className="mainLink">
      <div className="mainLinkInner">
        <link.icon size={20} className="mainLinkIcon" stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className="mainLinkBadge">
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className="collectionLink"
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}></span>
      {collection.label}
    </a>
  ));

  return (
    <nav className="navbar">
      <div className="section">
        <SnipdButton style={{ center: true, maxWidth: 320 }} />
      </div>

      <TextInput
        style={{ margin: "8px 16px 8px 16px" }}
        placeholder="Search Categories"
        size="xs"
        leftSection={<IconSearch style={{ width: "12px", height: "12px" }} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className="searchCode">Ctrl + K</Code>}
        styles={{ section: { pointerEvents: "none" } }}
        mb="sm"
      />

      <div className="section" style={{ marginTop: "16px" }}>
        <div className="mainLinks">{mainLinks}</div>
      </div>

      <div className="collection-section">
        <Group className="collectionsHeader" justify="space-between">
          <Text size="xs" fw={500} c="dimmed">
            Categories
          </Text>
          <Tooltip label="Create category" withArrow position="right">
            <ActionIcon variant="default" size={18}>
              <IconPlus style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className="collections">{collectionLinks}</div>
      </div>
    </nav>
  );
};

export default NavBarMantine;
