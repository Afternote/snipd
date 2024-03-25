import React from "react";
import "../styles/NavbarSearchStyle.css";
import { TextInput } from "@mantine/core";

const NavBarTypeSection = (props) => {
  return (
    <div>
      <TextInput
        style={{ margin: "8px 16px 8px 16px" }}
        placeholder="Search Categories"
        onChange={props.handleSearchInputChange}
        size="xs"
        radius="lg"
      />

      <div className="section" style={{ marginTop: "16px" }}>
        <div className="mainLinks">{props.mainLinks}</div>
      </div>
    </div>
  );
};

export default NavBarTypeSection;
