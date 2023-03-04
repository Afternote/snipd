import { useState } from "react";
import { TextInput, Button, Container, Flex } from "@mantine/core";

const MantineSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(`Searching for "${searchQuery}"...`);
  };

  return (
    <>
      <Container m={10}>
        <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Button onClick={handleSearchClick}>Search</Button>
        </Flex>
      </Container>
    </>
  );
};

export default MantineSearchBar;
