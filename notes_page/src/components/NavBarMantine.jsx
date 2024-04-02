import React, { useState, useEffect } from "react";
import { ScrollArea } from "@mantine/core";
import { getSnipdCounts, filterCategories } from "../utils/snipUtils";
import { SnipdButton } from "./SnipdButton";
import links from "../utils/mockData";
import SnippetTypeButton from "./SnippetTypeButton";
import SnippetCategoryButton from "./SnippetCategoryButton";
import NavBarTypeSection from "./NavBarTypeSection";
import NavBarAddCategory from "./NavBarAddCategory";
import NavBarCollectionHeader from "./NavBarCollectionHeader";
import "../styles/NavbarSearchStyle.css";

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
    const initialCounts = getSnipdCounts(props.filterState, props.snipds);
    setCounts(initialCounts);
  }, []);

  useEffect(() => {
    setCounts(getSnipdCounts(props.filterState, props.snipds));
  }, [ props.filterState.selectedCategory, props.snipds]);

  const fetchCounts = (filterState, snipds) => {
    setCounts(getSnipdCounts(filterState, snipds));
  };

  const mainLinks = links.map((link) => (
    <SnippetTypeButton
      link={link}
      setFilterState={props.setFilterState}
      filterState={props.filterState}
      counts={counts}
    />
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
        <SnippetCategoryButton
          index={index}
          setFilterState={props.setFilterState}
          filterState={props.filterState}
          collection={collection}
          snipds={props.snipds}
          fetchCounts={fetchCounts}
        />
      )
    );
    setCollectionLinks(updatedCollectionLinks);
  }, [categoryQuery, props.filterState, props.categories]);

  return (
    <nav className="navbar">
      <div className="section">
        <SnipdButton style={{ center: true, maxWidth: 280 }} />
      </div>

      <NavBarTypeSection handleSearchInputChange={handleSearchInputChange} mainLinks={mainLinks} />

      <div className="collection-section">
        <NavBarCollectionHeader handleCreateCategoryClick={handleCreateCategoryClick} />
        {addCategoryFlag && (
          <NavBarAddCategory
            handleNewCategoryChange={handleNewCategoryChange}
            handleAddCategory={handleAddCategory}
          />
        )}

        <ScrollArea style={{ height: 400 }}>
          <div className="collections">{collectionLinks}</div>
        </ScrollArea>
      </div>
    </nav>
  );
};

export default NavBarMantine;
