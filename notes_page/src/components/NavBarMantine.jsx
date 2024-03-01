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
  Button,
  ScrollArea,
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
  const typeCountsTemp = {};
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

  return typeCountsTemp;
}

function filterCategories(categoryQuery, categories) {
  return categories.filter((a) => {
    return a.toLowerCase().includes(categoryQuery.toLowerCase());
  });
}

const NavBarMantine = (props) => {
  const [counts, setCounts] = useState({});
  const [categoryQuery, setCategoryQuery] = useState("");
  const [collectionLinks, setCollectionLinks] = useState([]);
  const [addCategoryFlag, setAddCategoryFlag] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleNewCategoryChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleAddCategory = () => {
    props.addCategory(newCategoryName);
    setAddCategoryFlag(false);
  };

  useEffect(() => {
    const initialCounts = filterSnipds(props.searchQuery, props.selectedCategory, "", props.snipds);
    setCounts(initialCounts);
  }, []);

  useEffect(() => {
    setCounts(filterSnipds(props.searchQuery, props.selectedCategory, "", props.snipds));
  }, [props.searchQuery, props.selectedCategory, props.snipds]); // Updated dependencies

  const fetchCounts = (searchQuery, category, type, snipds) => {
    setCounts(filterSnipds(searchQuery, category, type, snipds));
    console.log(counts);
  };
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

  const handleSearchInputChange = (event) => {
    setCategoryQuery(event.target.value);
  };

  const handleCreateCategoryClick = () => {
    setAddCategoryFlag(!addCategoryFlag);
  };

  useEffect(() => {
    const updatedCollectionLinks = filterCategories(categoryQuery, props.categories).map(
      (collection, index) => (
        <a
          href="#"
          onClick={() => {
            props.setSelectedCategory(collection);
            props.setSelectedType("");
            fetchCounts(props.searchQuery, collection, "", props.snipds);
          }}
          key={`collection-${index}`}
          className="collectionLink">
          <span style={{ marginRight: rem(9), fontSize: rem(16) }}></span>
          {collection}
        </a>
      )
    );
    setCollectionLinks(updatedCollectionLinks);
    console.log(collectionLinks);
  }, [categoryQuery, props.categories]); // Track necessary changes

  return (
    <nav className="navbar">
      <div className="section">
        <SnipdButton style={{ center: true, maxWidth: 320 }} />
      </div>

      <TextInput
        style={{ margin: "8px 16px 8px 16px" }}
        placeholder="Search Categories"
        onChange={handleSearchInputChange}
        size="xs"
        leftSection={<IconSearch style={{ width: "12px", height: "12px" }} stroke={1.5} />}
        rightSectionWidth={70}
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
            <ActionIcon variant="default" size={18} onClick={handleCreateCategoryClick}>
              <IconPlus style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        {addCategoryFlag && (
          <Group justify="space-around">
            <TextInput
              style={{ margin: "8px 16px 8px 16px" }}
              placeholder="Add Category"
              size="xs"
              leftSection={<IconSearch style={{ width: "12px", height: "12px" }} stroke={1.5} />}
              rightSectionWidth={70}
              onChange={handleNewCategoryChange}
              styles={{ section: { pointerEvents: "none" } }}
              mb="sm"
            />
            <Button variant="outline" size="xs" onClick={handleAddCategory}>
              Add
            </Button>
          </Group>
        )}

        <ScrollArea style={{ height: 400 }} >
          <div className="collections">{collectionLinks}</div>
        </ScrollArea>
      </div>
    </nav>
  );
};

export default NavBarMantine;
