import { useState } from "react";
import { TextInput, Container, Flex, ActionIcon } from "@mantine/core";
import { IconSearch, IconPrinter } from "@tabler/icons-react";
import { Group, Title } from "@mantine/core";

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
        <Title order={2}>Snipd</Title>

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
              <IconSearch style={{ color: "white", width: "70%", height: "70%" }} />
            </ActionIcon>
            <ActionIcon
              onClick={() => print()}
              size="lg"
              color="blue"
              variant="filled"
              radius="xl"
              aria-label="Settings">
              <IconPrinter style={{ color: "white", width: "70%", height: "70%" }} />
            </ActionIcon>
          </Flex>
        </Container>
      </Group>
    </>
  );
};

export default MantineSearchBar;
