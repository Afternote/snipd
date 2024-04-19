import { useState } from "react";
import { TextInput, Container, Flex, ActionIcon, Button } from "@mantine/core";
import { Group} from "@mantine/core";
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Group className="printHide" style={{ justifyContent:'right', marginTop: "16px" }} position="apart" mb={"lg"}>
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
                  <PrinterIcon
                    style={{ color: "white", width: "70%", height: "70%" }}
                  />
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