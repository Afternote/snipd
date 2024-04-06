import React from "react";
import { SegmentedControl } from "@mantine/core";

const SortMenuComponent = () => {
  return (
    <div>
      Sort By:
      <SegmentedControl style={{marginLeft:'8px'}} size="xs" radius="md" data={["Time", "Title (Alphabetic)", "Length"]} />
    </div>
  );
};

export default SortMenuComponent;
