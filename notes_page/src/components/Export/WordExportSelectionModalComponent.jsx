import React, { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { saveAs } from "file-saver";
import {
  Document,
  HeadingLevel,
  HorizontalPosition,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  VerticalAlign,
} from "docx";

import { Checkbox } from "@mantine/core";

const WordExportSelectionModalComponent = (props) => {
  const [titleChecked, setTitleChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState(false);
  const [dateTimeChecked, setDateTimeChecked] = useState(false);

  const handleExportButtonClick = () => {
    const doc = new Document({
      sections: [
        {
          children: props.snippets.flatMap((snippet) => {
            if (snippet.type === "image") {
            } else {
              const contentElements = [];
              if (titleChecked) {
                contentElements.push(
                  new Paragraph({
                    text: snippet.title,
                    heading: HeadingLevel.HEADING_1,
                  })
                );
              }
              if (categoryChecked) {
                contentElements.push(
                  new Paragraph({
                    text: snippet.category,
                    heading: HeadingLevel.HEADING_6,
                  })
                );
              }

              contentElements.push(
                new Paragraph({
                  children: [new TextRun(snippet.content)],
                  spacing: { after: 400 },
                })
              );
              return contentElements;
            }
          }),
        },
      ],
    });
    const blob = Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
    });
  };

  return (
    <Modal
      opened={props.modalState}
      onClose={props.handleModalClose}
      title="Export Snippets"
      centered>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "16px" }}>
          Please Select the components that you want to include in the export
        </div>
        <SimpleGrid style={{ margin: "16px" }} cols={3}>
          <div>
            <Checkbox
              checked={titleChecked}
              onChange={(event) => setTitleChecked(event.currentTarget.checked)}
              label="Title"
            />
          </div>
          <div>
            {" "}
            <Checkbox
              checked={categoryChecked}
              onChange={(event) => setCategoryChecked(event.currentTarget.checked)}
              defaultChecked
              label="Category"
            />
          </div>
          <div>
            {" "}
            <Checkbox
              checked={dateTimeChecked}
              onChange={(event) => setDateTimeChecked(event.currentTarget.checked)}
              defaultChecked
              label="Date/Time"
            />
          </div>
        </SimpleGrid>
        <div style={{ margin: "16px", display: "flex", justifyContent: "right" }}>
          <Button onClick={handleExportButtonClick} variant="light">
            Export
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WordExportSelectionModalComponent;
