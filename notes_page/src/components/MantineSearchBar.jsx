import { useState } from "react";
import { TextInput, Container, Flex, ActionIcon, Button } from "@mantine/core";
import { Group } from "@mantine/core";
import SearchIcon from "../assets/icons/SearchIcon";
import PrinterIcon from "../assets/icons/PrinterIcon";
import OfficeIcon from "../assets/OfficeIcon";
import WordExportSelectionModalComponent from "./Export/WordExportSelectionModalComponent";
import IconGemini from "../assets/geminiIcon.png";
import SummarizeSnippetsModalComponent from "./Summary/SummarizeSnippetsModalComponent";

const MantineSearchBar = ({ snippets, onSearch, setPrinting, categoryList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const [modalState, setModalState] = useState(false);
  const [summarizeSnippetModalState, setSummarizeSnippetModalState] = useState(false);

  const print = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 200);
  };

  const handleModalClose = () => {
    setModalState(false);
  };
  const openOptionsModal = () => {
    setModalState(true);
  };

  const handleSummarizeSnippetModalClose = () => {
    setSummarizeSnippetModalState(false);
  };

  const openSummarizeModel = () => {
    setSummarizeSnippetModalState(true);
  };

  return (
    <>
      <WordExportSelectionModalComponent
        snippets={snippets}
        modalState={modalState}
        setModalState={setModalState}
        handleModalClose={handleModalClose}
        categoryList={categoryList}
      />
      <SummarizeSnippetsModalComponent
        modalState={summarizeSnippetModalState}
        setModalState={setSummarizeSnippetModalState}
        handleModalClose={handleSummarizeSnippetModalClose}
        categoryList={categoryList}

      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Button onClick={openOptionsModal} variant="light">
          <div style={{ margin: "8px" }}>
            <OfficeIcon style={{ color: "white", width: "70%", height: "70%" }} />
          </div>
          Export snippets as Doc
        </Button>

        <Button onClick={openSummarizeModel} variant="light">
          
          <div style={{ margin: "8px" }}>
            <img src={IconGemini} style={{ color: "white", width: "24px", height: "24px" }} />
          </div>
          Summarize Snippets (With Gemini)
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
