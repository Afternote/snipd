import React from "react";
import { ScrollArea } from "@mantine/core";
import CategoriesHeader from "./CategoriesHeader";
import "../../styles/NavbarSearchStyle.css";

const CategoriesSection = (props) => {
  return (
    <div className="collection-section">
      <CategoriesHeader handleCreateCategoryClick={props.handleCreateCategoryClick} />
      {props.addCategoryFlag && (
        <NavBarAddCategory
          handleNewCategoryChange={props.handleNewCategoryChange}
          handleAddCategory={props.handleAddCategory}
        />
      )}

      <ScrollArea style={{ height: 400 }}>
        <div className="collections">{props.categories}</div>
      </ScrollArea>
    </div>
  );
};

export default CategoriesSection;
