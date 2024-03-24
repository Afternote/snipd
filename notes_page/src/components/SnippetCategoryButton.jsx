import React from 'react'
import { Anchor } from '@mantine/core';
import "../styles/NavbarSearchStyle.css";
const SnippetCategoryButton = (props) => {
  return (
    <Anchor
          id={props.index}
          href="#"
          underline="never"
          key={`collection-${props.index}`}
          className="collectionLink"
          onClick={() => {
            props.setFilterState({
              ...props.filterState,
              selectedCategory: props.collection,
              selectedType: "",
            });
            props.fetchCounts(props.filterState, props.snipds);
          }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            {props.collection}
          </div>
        </Anchor>
  )
}

export default SnippetCategoryButton