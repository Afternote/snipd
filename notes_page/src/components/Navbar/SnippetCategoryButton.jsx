import React, { useEffect } from "react";
import { Button } from "@mantine/core";
import "../../styles/NavbarSearchStyle.css";
import { filterSnipds } from "../../utils/snipUtils";

const SnippetCategoryButton = (props) => {
  const handleButtonCLick = () => {
    props.setFilterState({
      ...props.filterState,
      selectedCategory: props.collection,
      selectedType: "",
    });
    props.fetchCounts(props.filterState, props.snipds);
  };

  return (
    <div style={{ justifyContent: "left", width: "100%" }}>
      <Button
        style={{ margin: "4px", width: "100%", display: "flex", justifyContent: "left" }}
        variant={props.filterState.selectedCategory == props.category ? "filled" : "subtle"}
        id={props.index}
        onClick={() => {
          handleButtonCLick();
        }}>
        {props.category}
      </Button>
    </div>
  );
};

export default SnippetCategoryButton;
