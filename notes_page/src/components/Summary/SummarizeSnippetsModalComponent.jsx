import React from "react";
import { Text, Checkbox, SimpleGrid, Modal, Button } from "@mantine/core";

const SummarizeSnippetsModalComponent = (props) => {
  return (
    <div>
      <Modal
        opened={props.modalState}
        onClose={props.handleModalClose}
        title="Export Snippets"
        centered>
        <div style={{ display: "flex", flexDirection: "column" }}>Hello World</div>
      </Modal>
    </div>
  );
};

export default SummarizeSnippetsModalComponent;
