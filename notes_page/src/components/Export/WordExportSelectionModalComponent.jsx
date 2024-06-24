import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Text, Checkbox, SimpleGrid, Modal, Button } from "@mantine/core";
import { Document, HeadingLevel,Packer, Paragraph, TextRun } from "docx";
import { MultiSelect } from "@mantine/core";
import { SegmentedControl } from "@mantine/core";

const WordExportSelectionModalComponent = (props) => {
  const [titleChecked, setTitleChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState(false);
  const [dateTimeChecked, setDateTimeChecked] = useState(false);
  const [sourceChecked, setSourceChecked] = useState(false);
  const [categoriesFilterState, setCategoriesFilterState] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSwitchChange = (value) => {
    setCategoriesFilterState(value != "All Snippets");
  };

  const handleCategoryFilterChange = (values) => {
    setSelectedCategories(values);
  };

  const handleExportButtonClick = () => {
    const snippetsToExport = props.snippets.filter((snippet) => {
      if (!categoriesFilterState) {
        return true;
      }q
      return selectedCategories.includes(snippet.category);
    });

    const doc = new Document({
      sections: [
        {
          children: snippetsToExport.flatMap((snippet) => {
            const contentElements = [];
            if (snippet.type === "image") {          
              // TODO()
            } else {
              
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
              if (sourceChecked) {
                contentElements.push(
                  new Paragraph({
                    text: snippet.source,
                    heading: HeadingLevel.HEADING_6,
                  })
                );
              }
              if (dateTimeChecked) {
                contentElements.push(
                  new Paragraph({
                    text: snippet.date,
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
        <div>
          <SegmentedControl
            size="xs"
            onChange={handleSwitchChange}
            data={["All Snippets", "Filter snippets by Category"]}
          />
        </div>
        {categoriesFilterState && (
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <MultiSelect
              size="xs"
              label="Select the categories to include"
              placeholder="Pick a category"
              data={props.categoryList}
              clearable
              searchable
              onChange={handleCategoryFilterChange}
            />
          </div>
        )}
        <div style={{ marginTop: "16px" }}>
          <Text size="sm">
            {" "}
            Please Select the components that you want to include in the export
          </Text>
        </div>
        <SimpleGrid style={{ margin: "16px" }} cols={2}>
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
              checked={sourceChecked}
              onChange={(event) => setSourceChecked(event.currentTarget.checked)}
              defaultChecked
              label="Source"
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
