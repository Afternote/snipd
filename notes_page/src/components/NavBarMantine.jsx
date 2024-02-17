import React, { useState, useEffect } from "react";
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
import {
  IconSearch,
  IconBlockquote,
  IconPhoto,
  IconUnlink,
  IconNote,
  IconPlus,
} from "@tabler/icons-react";

import "../styles/NavbarSearchStyle.css";

const links = [
  { icon: IconBlockquote, label: "Text", notifications: 3, type: "text" },
  { icon: IconPhoto, label: "Images", notifications: 4, type: "image" },
  { icon: IconUnlink, label: "Links", type: "link" },
  { icon: IconNote, label: "Notes", type: "note" },
];

function filterSnipds(searchQuery, category, type, snipds) {
  const typeCountsTemp = {}; // Reset count for each filtering operation
  const filteredSnipds = snipds.filter((a) => {
    const textToSearch = `${a.content} ${a.title}`.toLowerCase();
    const matchesCriteria =
      (!category || a.category === category) &&
      (!type || a.type === type) &&
      textToSearch.includes(searchQuery.toLowerCase());

    if (matchesCriteria) {
      typeCountsTemp[a.type] = (typeCountsTemp[a.type] || 0) + 1;
    }

    return matchesCriteria;
  });

  return  typeCountsTemp ;
}

const NavBarMantine = (props) => {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    setCounts(filterSnipds(props.searchQuery, props.selectedCategory, "", props.snipds))
    console.log(counts)
  });

  
  const fetchCounts = (searchQuery, category, type, snipds) => {
    setCounts(filterSnipds(searchQuery, category, type, snipds))
    console.log(counts)
  }
  const mainLinks = links.map((link) => (
    <UnstyledButton
      key={link.label}
      className="mainLink"
      onClick={() => {
        props.setSelectedType(link.type);
      }}>
      <div className="mainLinkInner">
        <link.icon size={20} className="mainLinkIcon" stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {counts[link.type] && (
        <Badge size="sm" variant="filled" className="mainLinkBadge">
          {counts[link.type]}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = props.categories.map((collection) => (
    <a
      href="#"
      onClick={() => {
        props.setSelectedCategory(collection);
        props.setSelectedType("");
        fetchCounts(props.searchQuery, collection, "", props.snipds)
      }}
      key={collection}
      className="collectionLink">
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}></span>
      {collection}
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
