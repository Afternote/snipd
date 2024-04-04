import { useState } from "react";
import { TextInput, Container, Flex, ActionIcon, Button } from "@mantine/core";
import { Group, Title } from "@mantine/core";
import SearchIcon from "../assets/icons/SearchIcon";
import PrinterIcon from "../assets/icons/PrinterIcon";

const MantineSearchBar = ({ onSearch, setPrinting }) => {
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

  return (
    <>
      <Group className="printHide" style={{ marginTop: "16px" }} position="apart" mb={"lg"}>
        <Button
          onClick={() => print()}
          color="blue"
          variant="filled"
          radius="xl"
          aria-label="Settings">
          Print
          <div style={{marginLeft:'8px'}}>
            <PrinterIcon
              style={{ marginLeft: "8px", color: "white", width: "70%", height: "70%" }}
            />
          </div>
        </Button>
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
          </Flex>
        </Container>
      </Group>
    </>
  );
};

export default MantineSearchBar;
