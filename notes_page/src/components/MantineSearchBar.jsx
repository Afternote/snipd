import { useState } from "react";
import { TextInput, Container, Flex, ActionIcon, Button } from "@mantine/core";
import { Group } from "@mantine/core";
import SearchIcon from "../assets/icons/SearchIcon";
import PrinterIcon from "../assets/icons/PrinterIcon";
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
import { saveAs } from "file-saver";
import OfficeIcon from "../assets/OfficeIcon";

const MantineSearchBar = ({ snippets, onSearch, setPrinting }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const print = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 200);
  };

  const generateDoc = () => {
    const doc = new Document({
      sections: [
        {
          children: snippets.flatMap((snippet) => {
            if (snippet.type === "image") {
            } else {
              const contentElements = [
                new Paragraph({
                  text: snippet.title,
                  heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                  text: snippet.category,
                  heading: HeadingLevel.HEADING_6,
                }),
              ];

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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Button onClick={() => generateDoc()} variant="light">
          <div style={{ margin: "8px" }}>
            <OfficeIcon style={{ color: "white", width: "70%", height: "70%" }} />
          </div>
          Export snippets as Doc
        </Button>
        
        <Group
          className="printHide"
          style={{ justifyContent: "right", marginTop: "16px" }}
          position="apart"
          mb={"lg"}>
          <Container m={10}>
            <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
              <TextInput
                radius="lg"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <ActionIcon
                onClick={() => onSearch(searchQuery)}
                size="lg"
                color="blue"
                variant="filled"
                radius="xl"
                aria-label="Settings">
                <SearchIcon style={{ color: "white", width: "70%", height: "70%" }} />
              </ActionIcon>
              <ActionIcon
                onClick={() => print()}
                color="blue"
                variant="filled"
                radius="xl"
                size="lg"
                aria-label="Settings">
                <div>
                  <PrinterIcon style={{ color: "white", width: "70%", height: "70%" }} />
                </div>
              </ActionIcon>
            </Flex>
          </Container>
        </Group>
      </div>
    </>
  );
};

export default MantineSearchBar;
