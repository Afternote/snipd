import React, { useState, useEffect } from "react";
import { getSnipdCounts, filterCategories } from "../../utils/snipUtils";
import { SnipdLogo } from "./SnipdLogo";
import links from "../../utils/mockData";
import SnippetTypeButton from "./TypeButton";
import SnippetCategoryButton from "./SnippetCategoryButton";
import TypeSection from "./TypeSection";
import CategoriesSection from "./CategoriesSection";
import "../../styles/NavbarSearchStyle.css";

const NavBarMantine = (props) => {
  const [counts, setCounts] = useState({});
  const [categoryQuery, setCategoryQuery] = useState("");
  const [categories, setCategories] = useState([]);
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
  }, [props.filterState.selectedCategory, props.snipds]);

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
    const updatedCategories = filterCategories(categoryQuery, props.categories).map(
      (category, index) => (
        <SnippetCategoryButton
          index={index}
          setFilterState={props.setFilterState}
          filterState={props.filterState}
          category={category}
          snipds={props.snipds}
          fetchCounts={fetchCounts}
        />
      )
    );
    setCategories(updatedCategories);
  }, [categoryQuery, props.filterState, props.categories]);

  return (
    <nav className="navbar">
      <div className="section">
        <SnipdLogo style={{ center: true, maxWidth: 280 }} />
      </div>

      <TypeSection handleSearchInputChange={handleSearchInputChange} mainLinks={mainLinks} />

      <CategoriesSection
        handleCreateCategoryClick={handleCreateCategoryClick}
        handleNewCategoryChange={handleNewCategoryChange}
        handleAddCategory={handleAddCategory}
        categories={categories}
        addCategoryFlag={addCategoryFlag}
      />
    </nav>
  );
};

export default NavBarMantine;
